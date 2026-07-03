# Somewhere Universal Link Opener

GitHub Pages site for `https://open.npsomewhere.com`.

The main invitation page links here from its **Open in App** button so iOS can
start a new Universal Link navigation instead of remaining on the same domain.
If the app is not installed, `/join/` shows a minimal download fallback while
preserving the invitation token.

The Apple App Site Association file is served from
`/.well-known/apple-app-site-association`.
