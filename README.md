# Aman Institute website

Source for [amaninstitute.org](https://amaninstitute.org), the website of **Aman Institute for
Intellectual Security Studies**, a 501(c)(3) nonprofit in Killeen, Texas. The site is built with
[Jekyll](https://jekyllrb.com) and [Tailwind CSS](https://tailwindcss.com), and published with
GitHub Pages.

| Page | URL | File |
| --- | --- | --- |
| Home | `/` | `index.html` |
| Who is Aman? | `/who-is-aman/` | `who-is-aman.html` |
| Programs | `/programs/` | `programs.html` |
| Publications | `/publications/` | `publications.html` |
| Aman Tube | `/aman-tube/` | `aman-tube.html` |
| Board Members | `/board-members/` | `board-members.html` |
| Contact | `/contact/` | `contact.html` |

Old WordPress links such as `amaninstitute.org/?page_id=14` are forwarded to the matching new page.

## Updating content

Most content lives in plain-text data files, so routine updates don't require touching any HTML.
You can edit them directly on GitHub (open the file, click the pencil icon, commit). The site
rebuilds and goes live a minute or two after the change reaches the `main` branch.

| To change… | Edit |
| --- | --- |
| Email, phone numbers, address, YouTube link | `_config.yml` (the `contact` and `social` sections) |
| Videos on Aman Tube (add, remove, reorder, feature on home page) | `_data/videos.yml` |
| Books on the Publications page | `_data/books.yml` |
| Board members | `_data/board.yml` |
| Services list | `_data/services.yml` |
| Tanweer program topics | `_data/tanweer.yml` |
| The six pillars ("Who is Aman?" page) | `_data/pillars.yml` |
| Menu items | `_data/navigation.yml` |

**Adding a video:** copy an existing entry in `_data/videos.yml` and replace the `id` with the
part of the YouTube link after `watch?v=` (for `https://www.youtube.com/watch?v=WEa1fqNCLBo`, the id
is `WEa1fqNCLBo`).

**Adding a book:** add an entry to `_data/books.yml`, then add the front cover as
`assets/images/books/<slug>.webp` (about 560 px wide) and the full wrap-around cover as
`assets/images/books/<slug>-full-cover.jpg`.

**Adding a board photo:** put a square image in `assets/images/people/` and set `photo:` for that
member in `_data/board.yml`.

### Changing the design

Pages are styled with Tailwind CSS utility classes directly in the HTML (`*.html`, `_layouts/`,
`_includes/`). Brand colors, fonts, and a few base styles are defined in `src/tailwind.css`. Small
reusable pieces such as buttons and section headings live in `_includes/` (for example
`_includes/btn.html`).

The stylesheet the site loads, `assets/css/main.css`, is generated from those classes and isn't
stored in the repository: the workflow builds it on every run. You can use any Tailwind class in
the templates, including ones that weren't used before, and it will be included automatically.

## Publishing with GitHub Pages

Deployment is handled by the workflow in `.github/workflows/pages.yml`:

- **Pull requests:** the CSS and site are built and every internal link and image is checked. Nothing is published.
- **Pushes to `main`:** the CSS and site are built, checked, and deployed to GitHub Pages.

### 1. Turn on GitHub Pages (one time)

1. In this repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Merge the website into `main`, or, if it is already there, open **Actions → Website → Run workflow**.
   (The workflow fails until GitHub Pages is turned on, so do step 2 first.)

The site is then live at **https://akaban01.github.io/Aman-institute/**, which is a good place to
review it before switching the domain over.

### 2. Point amaninstitute.org at GitHub Pages

The domain currently points to the old WordPress host. When you're ready to switch:

1. **Verify the domain (recommended).** In your GitHub account (not the repository), go to
   **Settings → Pages → Add a domain**, enter `amaninstitute.org`, and add the `TXT` record GitHub
   shows you at your DNS provider. This stops anyone else from claiming the domain on GitHub Pages.
2. **Add the custom domain.** In this repository, go to **Settings → Pages → Custom domain**, enter
   `amaninstitute.org`, and click **Save**.
3. **Update DNS** at the company that manages the domain's DNS. For the root domain (`@`), remove the
   existing `A`/`AAAA` records that point to the old host and add:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `akaban01.github.io` |

   Leave any `MX` (email) and other `TXT` records as they are. Don't add a wildcard (`*`) record.
4. **Rebuild the site.** Open **Actions → Website → Run workflow**. This step is required: the
   build that was live at `akaban01.github.io/Aman-institute/` links to pages under
   `/Aman-institute/`, so it has to be rebuilt to work at the root of `amaninstitute.org`.
5. **Turn on HTTPS.** Once the DNS check on the Pages settings screen passes, tick **Enforce HTTPS**.
   GitHub can take up to 24 hours to issue the certificate.

`www.amaninstitute.org` (the address printed on the flyers) will redirect to `amaninstitute.org`
automatically. The institute's email address is on Yahoo, so it isn't affected by these changes.

Before cancelling the WordPress hosting, consider keeping an export of the old site
(**WordPress admin → Tools → Export**) for your records.

## Previewing locally

Requires Ruby 3.3 with Bundler, and Node.js 20 or newer.

```sh
npm install
bundle install
```

Then run these two commands in separate terminals and open <http://localhost:4000>:

```sh
npm run watch:css           # rebuilds assets/css/main.css when templates change
bundle exec jekyll serve    # serves the site and rebuilds it when files change
```

To run the same build and link check as the workflow:

```sh
npm run build:css
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer _site --disable-external
```

## Credits

- Styles: [Tailwind CSS](https://tailwindcss.com), MIT License.
- Fonts: [Inter](https://github.com/rsms/inter), [Plus Jakarta Sans](https://github.com/tokotype/PlusJakartaSans),
  and [Reem Kufi](https://github.com/aliftype/reem-kufi), self-hosted under the SIL Open Font License
  (see `assets/fonts/README.md`).
- Icons: [Lucide](https://lucide.dev), ISC License.
- Logo, photos, flyers, and book covers belong to Aman Institute for Intellectual Security Studies.
