# Zendesk Coding Challenge

## Getting Started

> Note: This project uses [Nx](https://nx.dev)

1. Set your Zendesk sub-domain in the API [environment file](./apps/api/src/environments/environment.ts):
    ```json
    {
      "zendesk": {
        "subdomain": "my-subdomain"
      }
      ...
    }
    ```

1. Start the NestJS API:
    ```bash
    nx serve api
    ```

1. Start the Angular Web App:
    ```bash
    nx serve web
    ```

1. Visit http://localhost:4200 to sign in and view tickets

## Project Stucture

*A high-level overview of the `nx` apps and libs...*

### NestJS REST API

`apps/api`

- Handles Zendesk access token generation using OAuth and returns a token to the web app ([auth.service.ts](./apps/api/src/app/auth.service.ts))
- Acts as a proxy for ticket requests ([tickets.service.ts](./apps/api/src/app/tickets.service.ts))

### Angular App

`apps/web`

- Requires user login ([auth.guard.ts](./apps/web/src/app/guards/auth.guard.ts))
- Performs user sign in ([auth.component.ts](./apps/web/src/app/components/auth/auth.component.ts), [auth.component.html](./apps/web/src/app/components/auth/auth.component.html))
- Displays paginated table of tickets ([tickets.component.ts](./apps/web/src/app/components/tickets/tickets.component.ts), [tickets.component.html](./apps/web/src/app/components/tickets/tickets.component.html))


### Zendesk Types 

`libs/types`

Shared types between the API and Web App:

- [oauth.ts](./libs/types/src/lib/oauth.ts)
- [tickets.ts](./libs/types/src/lib/tickets.ts)
