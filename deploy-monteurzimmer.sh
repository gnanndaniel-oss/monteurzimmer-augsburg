#!/bin/bash
set -e

# ============================================
# Deploy: monteurzimmer.augsburg-apartments.de
# Next.js Static Export → Plesk httpdocs
# ============================================

DOMAIN="monteurzimmer.augsburg-apartments.de"
HTTPDOCS="/var/www/vhosts/augsburg-apartments.de/subdomains/monteurzimmer/httpdocs"
REPO="https://github.com/gnanndaniel-oss/monteurzimmer-augsburg.git"
BUILD_DIR="/tmp/monteurzimmer-build"
BACKUP_DIR="/tmp/monteurzimmer-backup-$(date +%Y%m%d-%H%M%S)"
NODE="/opt/plesk/node/24/bin/node"
NPM="/opt/plesk/node/24/bin/npm"
NPX="/opt/plesk/node/24/bin/npx"

echo "=========================================="
echo "  Deploying: $DOMAIN"
echo "=========================================="

# 0. Check Node
echo ""
echo "[0/7] Checking Node.js..."
if [ ! -f "$NODE" ]; then
    echo "ERROR: Node.js not found at $NODE"
    echo "Trying system node..."
    NODE=$(which node)
    NPM=$(which npm)
    NPX=$(which npx)
fi
$NODE --version

# 1. Check httpdocs path
echo ""
echo "[1/7] Checking httpdocs path..."
if [ ! -d "$HTTPDOCS" ]; then
    echo "Path $HTTPDOCS not found, trying alternative..."
    # Try direct subdomain path
    ALT1="/var/www/vhosts/augsburg-apartments.de/httpdocs/monteurzimmer"
    ALT2="/var/www/vhosts/$DOMAIN/httpdocs"
    if [ -d "$ALT2" ]; then
        HTTPDOCS="$ALT2"
    elif [ -d "$ALT1" ]; then
        HTTPDOCS="$ALT1"
    else
        echo "Available vhosts:"
        ls /var/www/vhosts/ 2>/dev/null || true
        echo ""
        echo "Searching for monteurzimmer..."
        find /var/www/vhosts/ -maxdepth 3 -name "httpdocs" -path "*monteurzimmer*" 2>/dev/null || true
        find /var/www/vhosts/ -maxdepth 3 -name "httpdocs" -path "*augsburg-apartments*" 2>/dev/null || true
        echo ""
        echo "ERROR: Cannot find httpdocs directory!"
        echo "Please set HTTPDOCS manually and re-run."
        exit 1
    fi
fi
echo "Using httpdocs: $HTTPDOCS"

# 2. Backup old site
echo ""
echo "[2/7] Backing up old site..."
mkdir -p "$BACKUP_DIR"
cp -a "$HTTPDOCS" "$BACKUP_DIR/httpdocs-old" 2>/dev/null || true
echo "Backup saved to: $BACKUP_DIR"

# 3. Save existing images
echo ""
echo "[3/7] Saving existing images..."
IMAGES_BACKUP="/tmp/monteurzimmer-images"
rm -rf "$IMAGES_BACKUP"
mkdir -p "$IMAGES_BACKUP"
# Copy all image directories/files from old site
find "$HTTPDOCS" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" -o -name "*.svg" -o -name "*.ico" \) -exec cp --parents {} "$IMAGES_BACKUP/" \; 2>/dev/null || true
IMG_COUNT=$(find "$IMAGES_BACKUP" -type f | wc -l)
echo "Saved $IMG_COUNT images"

# 4. Clone repo & build
echo ""
echo "[4/7] Cloning repo and building..."
rm -rf "$BUILD_DIR"
git clone "$REPO" "$BUILD_DIR"
cd "$BUILD_DIR"

export PATH="/opt/plesk/node/24/bin:$PATH"
$NPM install --legacy-peer-deps
$NPX next build

# 5. Deploy static export
echo ""
echo "[5/7] Deploying to httpdocs..."
if [ ! -d "$BUILD_DIR/out" ]; then
    echo "ERROR: Build output directory 'out' not found!"
    ls -la "$BUILD_DIR/"
    exit 1
fi

# Clear httpdocs but keep .htaccess if exists
if [ -f "$HTTPDOCS/.htaccess" ]; then
    cp "$HTTPDOCS/.htaccess" /tmp/monteurzimmer-htaccess-bak
fi

rm -rf "${HTTPDOCS:?}"/*
rsync -a "$BUILD_DIR/out/" "$HTTPDOCS/"

if [ -f /tmp/monteurzimmer-htaccess-bak ]; then
    cp /tmp/monteurzimmer-htaccess-bak "$HTTPDOCS/.htaccess"
fi

# 6. Restore images & place PHP mailer
echo ""
echo "[6/7] Restoring images and placing PHP mailer..."

# Restore images from backup into the new site
if [ "$IMG_COUNT" -gt 0 ]; then
    # Copy images maintaining relative paths
    cd "$IMAGES_BACKUP"
    find . -type f | while read -r img; do
        REL_PATH="${img#./$HTTPDOCS/}"
        # If path still contains var/www, strip it
        if echo "$REL_PATH" | grep -q "var/www"; then
            REL_PATH=$(echo "$img" | sed "s|.*httpdocs/||")
        fi
        mkdir -p "$HTTPDOCS/$(dirname "$REL_PATH")"
        cp "$img" "$HTTPDOCS/$REL_PATH" 2>/dev/null || true
    done
    echo "Images restored"
fi

# Also copy images directory from old backup directly
if [ -d "$BACKUP_DIR/httpdocs-old/data" ]; then
    cp -a "$BACKUP_DIR/httpdocs-old/data" "$HTTPDOCS/" 2>/dev/null || true
    echo "Data directory restored from backup"
fi
if [ -d "$BACKUP_DIR/httpdocs-old/images" ]; then
    cp -a "$BACKUP_DIR/httpdocs-old/images" "$HTTPDOCS/" 2>/dev/null || true
    echo "Images directory restored from backup"
fi

# Place PHP mailer
mkdir -p "$HTTPDOCS/php"
cp "$BUILD_DIR/php/send.php" "$HTTPDOCS/php/send.php"
echo "PHP mailer installed"

# 7. Set permissions
echo ""
echo "[7/7] Setting permissions..."
# Find the system user for the vhost
SYSTEM_USER=$(stat -c '%U' "$HTTPDOCS/..") 2>/dev/null || SYSTEM_USER="root"
chown -R "$SYSTEM_USER:psaserv" "$HTTPDOCS" 2>/dev/null || true
chmod -R 755 "$HTTPDOCS"
find "$HTTPDOCS" -type f -exec chmod 644 {} \;

# Cleanup
echo ""
echo "Cleaning up build directory..."
rm -rf "$BUILD_DIR"

echo ""
echo "=========================================="
echo "  DEPLOYMENT COMPLETE!"
echo "=========================================="
echo "  Site: https://$DOMAIN"
echo "  Backup: $BACKUP_DIR"
echo "  Images: $IMG_COUNT files restored"
echo ""
echo "  Test: curl -I https://$DOMAIN"
echo "=========================================="
