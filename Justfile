prod-proxy:
  ssh -L 5432:$(ssh jack@jackharrhy.com "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' core-wrenchball_db-1"):5432 jack@jackharrhy.com
