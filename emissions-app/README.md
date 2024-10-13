## Marino Emissions App

This app is used to track emissions from students attending Marino Institute of Education.

## AI Assistance Disclosure

This was developed with the assistance of AI via the ChatGPT application models `o1-preview` and `GPT-4o`.

## Developing locally

Initial setup:
```sh
source quickstart.sh
```

Launch web app locally:

```sh
docker-compose up
```

Re-build and launch (if dependencies change):

```sh
source rebuild-and-launch.sh
```

Running tests

```sh
source app-test.sh
```

## Deploy to Prod (From Local)

```sh
bash deploy.sh
```

