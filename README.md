# Django, Postgres and Docker setup in Pycharm

Skeleton setup of Django with postgres in a docker environment

## Folder structure
````
djangoapp/
├── app/
│ ├── settings/
│ │ ├── init.py
│ │ ├── asgi.py
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── init.py
│ └── manage.py
├── build/
│ ├── SAMPLE.env
│ ├── Dockerfile_app
│ └── Dockerfile_db
├── .gitignore
├── docker-compose.yml
└── README.md
````

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Create build/.env file from build/SAMPLE.env with your credentials
4. Build using docker compose file: `docker compose build`
5. Create and start docker containers: `docker compose up -d`  
6. Run migration: `docker exec -u root anl-django-app python manage.py migrate`


## License

This project is licensed under the GNU General Public License (GPL) v3.0. See the [LICENSE](LICENSE) file for details.

## License Information

The GNU General Public License (GPL) v3.0 is a widely used open-source license that ensures that any derivative works also remain open source. It allows users to use, modify, and distribute the software, but any modifications or derivative works must also be licensed under the GPL and made freely available. For more information, see the [GPLv3 License](https://www.gnu.org/licenses/gpl-3.0.html).
