# Glossary and status workflow

## Booking statuses

| Status | Meaning | Set by |
|---|---|---|
| Pending | Request sent, waiting for the provider | system |
| Confirmed | Provider accepted; work not started | provider |
| In progress | Work started | provider |
| Delivered | Provider handed over the work; waiting for client approval | provider |
| Completed | Client approved; can be reviewed | client |
| Declined | Provider refused the request | provider |
| Cancelled | Client withdrew | client |

Allowed transitions (`TR` in `js/core/status.js`):

* Client: Pending → Cancelled · Confirmed → Cancelled · Delivered → Completed or In progress (revision)
* Provider: Pending → Confirmed or Declined · Confirmed → In progress · In progress → Delivered

The client's bookings page groups these into four tabs: **Upcoming / Active** (Pending, Confirmed), **In progress**, **Completed** (Delivered, Completed) and **Cancelled** (Cancelled, Declined). Providers see each status separately.

## Request and offer statuses

* Request: **Open → Offers received → Accepted → Closed** (Closed means the client closed it).
* Offer: **Pending** (shown to a provider as "Awaiting response"), **Accepted**, **Declined**.

## Notification types

`offer` (new offer / new request), `accepted`, `completed` (service delivered, review requested), `status` (declined, cancelled, closed, expired), `booking` (provider: new booking request), `review`. Small operational updates are shown as a toast and are not stored.
