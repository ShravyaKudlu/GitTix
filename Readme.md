A cool Website that basically helps with your ticketing needs on a concert.
Where a user can buy and sell tickets, and also a special feature where if a buyer adds the ticket to their cart, it would be expired within 10 minutes if the buyer doesn't buy, so the seller can sell it to someone else or even increase their price. 
It has real security issues solved with JWT.
Real payment done by using stripe API
Uses docker, kubernetes and Jest with github actions so any new feature can always be auto tested before merging.
I have managed to loosly couple each and every service, using NATS to alert the services.
To ensure it runs smoothly while development I have used skaffold, inginx
