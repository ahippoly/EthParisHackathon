FROM mongo:latest

RUN apt-get update && apt-get install -y curl gnupg git nano zsh

# Install Oh My Zsh
ENV ZSH="/root/.oh-my-zsh"
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Set Zsh as the default shell
ENV SHELL="/bin/zsh"
RUN chsh -s /bin/zsh

# Install mongosh
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN apt-get update && apt-get install -y mongodb-mongosh