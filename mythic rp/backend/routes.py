from flask import Blueprint, render_template, jsonify

main_bp = Blueprint("main", __name__)

STEPS = [
    {
        "number": 1,
        "title": "Download RAGE:MP",
        "description": "Visit the official RAGE Multiplayer website and download the launcher to start playing GTA V RP.",
        "buttons": [
            {"label": "Official RAGE:MP Website", "url": "https://rage.mp/"},
            {"label": "Direct Download Link", "url": "https://rage.mp/releases/"},
        ],
    },
    {
        "number": 2,
        "title": "Install & Launch RAGE:MP",
        "description": "Install the downloaded RAGE:MP launcher and open it to begin setting up your game.",
        "badges": ["Auto Detects GTA V", "Fast Setup in 2 Minutes"],
    },
    {
        "number": 3,
        "title": "Join Mythic RP",
        "description": "In the RAGE:MP launcher, search for Mythic RP or direct connect to our server!",
        "server": "gta5.mythicrp.in:22005",
        "connect": "rage://connect/gta5.mythicrp.in:22005",
    },
]

CAREER_PATHS = [
    {
        "id": "law-enforcement",
        "title": "Law Enforcement",
        "subtitle": "Become a Cop",
        "description": "Join the police force and maintain order in the city. Patrol the streets, investigate crimes, and protect civilians.",
        "image": "/static/img/policeman-dog_845437-3429.jpg",
        "features": ["Police Academy Training", "Detective Work", "SWAT Operations", "Traffic Control"],
        "difficulty": "Medium",
        "salary": "$45,000 - $85,000"
    },
    {
        "id": "criminal-life",
        "title": "Criminal Empire",
        "subtitle": "Gangster Life",
        "description": "Build your criminal empire from the ground up. Form alliances, control territory, and rule the underworld.",
        "image": "/static/img/gang.jpg",
        "features": ["Gang Formation", "Territory Control", "Heists & Robberies", "Underground Business"],
        "difficulty": "High",
        "salary": "$20,000 - $500,000"
    },
    {
        "id": "business-life",
        "title": "Business & Family",
        "subtitle": "Businessman & Family Life",
        "description": "Start legitimate businesses, buy properties, get married, and build a family empire in the city.",
        "image": "/static/img/beach.jpg",
        "features": ["Real Estate", "Business Ownership", "Marriage & Family", "Luxury Lifestyle"],
        "difficulty": "Easy",
        "salary": "$60,000 - $200,000"
    }
]


@main_bp.route("/")
def index():
    # Server-rendered page (Jinja) - also includes a small Vue widget that reads /api/steps
    return render_template("index.html", steps=STEPS, careers=CAREER_PATHS)


@main_bp.route("/api/steps")
def api_steps():
    # Return the structured steps as JSON for frontend clients
    return jsonify(STEPS)


@main_bp.route("/api/careers")
def api_careers():
    # Return career paths as JSON
    return jsonify(CAREER_PATHS)
