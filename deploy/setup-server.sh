#!/usr/bin/env bash
# One-time bootstrap for a fresh Hetzner Ubuntu 24.04 server.
# Run as root: bash setup-server.sh
set -euo pipefail

REPO_URL="git@github.com:omar-haha/rcca.git"
APP_DIR="/opt/rcca"
DEPLOY_USER="deploy"

echo "==> Updating system packages"
apt-get update -y && apt-get upgrade -y

echo "==> Installing base tools"
apt-get install -y ufw fail2ban git curl ca-certificates

echo "==> Configuring firewall (SSH + HTTP/HTTPS only)"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> Enabling fail2ban"
systemctl enable --now fail2ban

echo "==> Installing Docker"
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

echo "==> Creating deploy user"
if ! id "$DEPLOY_USER" &>/dev/null; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
  usermod -aG docker "$DEPLOY_USER"
fi

echo "==> Generating SSH keypair #1: for GitHub Actions to SSH INTO this server"
mkdir -p "/home/$DEPLOY_USER/.ssh"
if [ ! -f "/home/$DEPLOY_USER/.ssh/github_actions_deploy" ]; then
  ssh-keygen -t ed25519 -f "/home/$DEPLOY_USER/.ssh/github_actions_deploy" -N "" -C "github-actions-deploy"
  cat "/home/$DEPLOY_USER/.ssh/github_actions_deploy.pub" >> "/home/$DEPLOY_USER/.ssh/authorized_keys"
fi

echo "==> Generating SSH keypair #2: for THIS server to git-pull from GitHub (if repo is private)"
if [ ! -f "/home/$DEPLOY_USER/.ssh/id_ed25519" ]; then
  ssh-keygen -t ed25519 -f "/home/$DEPLOY_USER/.ssh/id_ed25519" -N "" -C "rcca-server-deploy-key"
fi
ssh-keyscan -t ed25519 github.com >> "/home/$DEPLOY_USER/.ssh/known_hosts" 2>/dev/null

chown -R "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
chmod 700 "/home/$DEPLOY_USER/.ssh"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys" "/home/$DEPLOY_USER/.ssh/github_actions_deploy" "/home/$DEPLOY_USER/.ssh/id_ed25519"
chmod 644 "/home/$DEPLOY_USER/.ssh/github_actions_deploy.pub" "/home/$DEPLOY_USER/.ssh/id_ed25519.pub"

echo ""
echo "  >>> Add this PUBLIC key as a read-only Deploy Key on the GitHub repo"
echo "  >>> (Settings -> Deploy keys -> Add deploy key) BEFORE the clone below runs:"
echo ""
cat "/home/$DEPLOY_USER/.ssh/id_ed25519.pub"
echo ""
read -rp "Press Enter once the deploy key is added to GitHub... "

echo "==> Cloning repo into $APP_DIR (as $DEPLOY_USER)"
if [ ! -d "$APP_DIR/.git" ]; then
  sudo -u "$DEPLOY_USER" git clone "$REPO_URL" "$APP_DIR"
fi
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

echo ""
echo "############################################################"
echo "  DONE. Remaining manual steps:"
echo ""
echo "  1) Create $APP_DIR/.env.production with your real secrets"
echo "     (see .env.example in the repo for the variable list)."
echo ""
echo "  2) Add this PRIVATE key as the GitHub secret HETZNER_SSH_KEY:"
echo "     cat /home/$DEPLOY_USER/.ssh/github_actions_deploy"
echo ""
echo "  3) Set GitHub secrets HETZNER_HOST (this server's IP) and"
echo "     HETZNER_USER=$DEPLOY_USER"
echo ""
echo "  4) First build (as $DEPLOY_USER):"
echo "     cd $APP_DIR && docker compose build && docker compose up -d"
echo "############################################################"
