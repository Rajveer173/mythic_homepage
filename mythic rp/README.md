# Mythic RP — How to Play (Flask + Jinja + Vue demo)

This small project provides a minimal Flask backend that serves a Jinja page showing "How to Play" steps and an API endpoint `/api/steps` that returns the same content as JSON. There's also a small Vue (CDN) demo both inside the Jinja template and a standalone `frontend/index.html` that fetches the API.

Files added:

- `backend/app.py` — Flask application factory + run block
- `backend/routes.py` — routes for `/` and `/api/steps`
- `backend/templates/index.html` — Jinja template (server-rendered cards + small Vue widget)
- `backend/static/css/style.css` — page styles
- `backend/requirements.txt` — minimal dependencies
- `frontend/index.html` — standalone frontend demo (Vue via CDN)

Notes about images

- I added three placeholder SVGs in `backend/static/img/` named `char1.svg`, `char2.svg`, and `char3.svg`. They are simple SVG placeholders so the site shows a character strip. Replace these with your preferred GTA character images (PNG/JPG/SVG) by overwriting the files or updating the `src` in `backend/templates/index.html`.

Run locally (PowerShell)

1. Create and activate a virtualenv:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r "backend/requirements.txt"
```

3. Run the app (two options):

- Direct Python run (recommended for quick dev):

```powershell
python "backend/app.py"
```

- Or set FLASK_APP and run with flask (app factory):

```powershell
$env:FLASK_APP = "backend.app:create_app"
flask run --host=127.0.0.1 --port=5000
```

4. Open the pages in your browser:

- Server-side page: http://127.0.0.1:5000/
- Frontend demo: http://127.0.0.1:5000/frontend/index.html

If you want to use higher-quality GTA character art, download the images into `backend/static/img/` (for example `char1.png`) and update the `<img src="/static/img/char1.svg">` references in `backend/templates/index.html` to point to the new filenames. Keep licensing in mind when using copyrighted artwork.

Notes

- The `frontend/index.html` file is served as a static file because Flask serves `frontend/` only if you configure it or serve it via another static host; if you prefer to open it directly from the filesystem, change the fetch URL to `http://127.0.0.1:5000/api/steps` or host it inside Flask static. The included template uses `/api/steps` and is integrated.

Next steps (suggestions):

- Add more content or images to the template (place under `backend/static/`).
- Add unit tests for the API endpoint.
