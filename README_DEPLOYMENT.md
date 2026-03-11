# Project analysis and deployment notes

## Current project shape

- `Back/core` is a Django 5.2 + Django REST Framework API.
- The only model is `Car`, with image uploads stored under `media/images`.
- The backend expects MySQL on `localhost:3306` with database `project_db`, user `root`, password `1111`.
- `Front` is a static HTML/CSS/JS frontend with no build step.

## Deployment constraints in the current code

- Backend settings are hardcoded for local MySQL, so a normal multi-container `backend -> db` connection is not possible without editing `Back/core/core/settings.py`.
- To avoid changing backend code, `docker-compose.yml` uses `network_mode: service:db` for the backend. This is a workaround so Django can still reach MySQL on `localhost:3306`.
- The frontend is hardcoded to call `http://127.0.0.1:8000/api/cars/` in `Front/index.js`. This means a remote browser will call its own machine, not the EC2 backend. As written, the frontend is not deployable for external users without changing that URL.

## What was added

- `.gitignore`
- `docker-compose.yml`
- `deploy/backend.Dockerfile`
- `deploy/ec2-bootstrap.sh`
- `deploy/ec2-deploy.sh`
- `.github/workflows/ci-cd.yml`
- `deploy/github-secrets.md`

## GitHub push steps

```bash
cd C:\Users\ASUS\Desktop\CI_CD
git init
git add .
git commit -m "Add Docker Compose and GitHub Actions deployment"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

## EC2 setup steps

Use Ubuntu on EC2 and open inbound ports:

- `22` for SSH
- `8000` for the Django API

Then on the instance:

```bash
git clone https://github.com/<your-user>/<your-repo>.git /opt/ci_cd
cd /opt/ci_cd
chmod +x deploy/ec2-bootstrap.sh deploy/ec2-deploy.sh
./deploy/ec2-bootstrap.sh
```

Reconnect over SSH after bootstrap, then run:

```bash
cd /opt/ci_cd
docker compose up -d --build
```

## GitHub Actions secrets

Add the secrets listed in `deploy/github-secrets.md`.

## Recommended next code changes

These were not applied because you asked not to touch backend or frontend code:

1. Read Django database and secret settings from environment variables.
2. Replace the frontend API URL with a configurable value or a relative path.
3. Put Nginx in front of Django and serve media/static through it.
