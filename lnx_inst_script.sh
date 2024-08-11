#!/bin/bash

# Update the system
echo "Script by Olaf Sebastian Frenzel"
echo "Updating Linux with the necessarry tools..."
sudo apt-get update -y
sudo apt-get upgrade -y

# Install required packages
echo "Installing required packages..."
sudo apt-get install -y nginx git apt-transport-https ca-certificates curl gnupg lsb-release software-properties-common

# Install Docker
echo "Installing Docker..."
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
# Add Docker's official GPG key:
sudo apt-get update -y
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


# Install docker-compose
echo "installing docker-compose..."
wget https://github.com/docker/compose/releases/download/v2.19.1/docker-compose-linux-x86_64
sudo mv docker-compose-linux-x86_64 /usr/bin/docker-compose
chmod +x /usr/bin/docker-compose
docker-compose -v


# Install NVM (Node Version Manager)
echo "Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Load NVM and install the latest Node.js
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

echo "Installing the latest Node.js..."
nvm install node 20

echo # Installing Angular ...
npm install -g @angular/cli

# Verify installation
echo "Verifying Node.js and npm installation..."
node -v
npm -v

# Stop NGINX
echo "stopping nginx to install certificates"
sudo service nginx stop

# Install Certbot for Let's Encrypt
echo "Installing Certbot..."
sudo apt-get install -y certbot

read -p "Enter your primary domain (e.g., mywebsite.ai): " domain

# Configure Nginx file
echo "Configuring Nginx for $domain..."

sudo tee /etc/nginx/sites-available/default > /dev/null <<EOL
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    location / {
        return 301 https://\$host\$request_uri;
    }
}
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name $domain autodiscover.* autoconfig.*;
  ssl_certificate_key /etc/letsencrypt/live/$domain/privkey.pem;
  ssl_certificate /etc/letsencrypt/live/$domain/fullchain.pem;
  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:50m;
  ssl_session_tickets off;

  ssl_protocols TLSv1.2;
  ssl_ciphers HIGH:!aNULL:!MD5:!SHA1:!kRSA;
  ssl_prefer_server_ciphers off;

  location / {
    proxy_pass http://0.0.0.0:8088/;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    client_max_body_size 0;
    }

 location /api/ {
     proxy_pass http://0.0.0.0:8079;
 }
}
EOL

# Obtain and install the HTTPS certificate
echo "Obtaining and installing HTTPS certificate for $domain..."
sudo certbot certonly --standalone -d $domain
# Restart Nginx
sudo systemctl restart nginx
echo "All tasks completed successfully!"
