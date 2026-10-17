# GreenLink Firestore data model

GreenLink uses collection names prefixed with `greenlink_` so it can safely share the
`fit5032-19cab` Firebase project with the existing classroom `books` collection.

## Public catalogue collections

| Collection | Document ID | Important fields |
| --- | --- | --- |
| `greenlink_spaces` | Numeric catalogue ID | `id`, `name`, `suburb`, `type`, `summary`, `detail`, `latitude`, `longitude` |
| `greenlink_plants` | Numeric catalogue ID | `id`, `name`, `sunlight`, `garden`, `type`, `summary`, `detail` |
| `greenlink_events` | Numeric event ID | `id`, `title`, `location`, `date`, `dateIso`, `dateGroup`, `tag`, `summary`, `ownerId` |
| `greenlink_learning_topics` | Numeric topic ID | `id`, `title`, `summary` |
| `greenlink_meta` | Metadata name | `schemaVersion`, record counts, `updatedAt` |

Catalogue documents can be read publicly. Catalogue writes are reserved for authenticated
organisers. Each seeded document carries `schemaVersion` and `updatedAt` fields.

## User and activity collections

| Collection | Ownership and purpose |
| --- | --- |
| `users` | One profile per Firebase Auth UID. Stores display name and `resident`/`organiser` role. |
| `greenlink_saved_items` | User-owned saved space, plant, or event references. |
| `greenlink_registrations` | User-owned event registrations with status and timestamps. |
| `greenlink_ratings` | User-owned 1–5 ratings for catalogue items. |
| `greenlink_volunteer_interests` | User-owned volunteer interest submissions. |

Activity documents include a `userId` equal to the authenticated Firebase UID. Security
Rules prevent users from reading or writing another user's activity documents.

## Migration and safety

- `npm run seed:emulator` seeds the local Firestore Emulator.
- Cloud seeding requires both `--cloud` and an exact `--confirm-project` value.
- Seeding uses deterministic document IDs and merge writes, so rerunning it is idempotent.
- The legacy `books` collection is not read, changed, or deleted by GreenLink migration code.
