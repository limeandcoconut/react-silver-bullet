## [Unreleased]

## [1.2.0] - 2019-05-15
### Changed
- Fixed `'unsafe-inline'` in CSP with [nonce](src/server/index.js).
- Moved to [express-manifest-helpers](https://github.com/danethurber/express-manifest-helpers) after [security fix](https://github.com/danethurber/express-manifest-helpers/pull/4).
- Full dependency update.
- Improved jsDoc somewhat.
### Removed
- src/server/middleware/manifest-helpers.js
### Added
- npm script `start:live`.
### Depreciated
- npm script `start:prod-test` is depreciated. Use `start:live` instead.
### Security
-  See CSP above.


## [1.1.0] - 2019-05-08
### Changed
- Dropping @babel/polyfill in favor of core-js 3 since [@babel/polyfill is now deprecated](https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill)
- Dependency update
- Add favicon to dev build

## [1.0.0] - 2019-05-08
### Changed
- Cleaned up styles and look
- Add ./certs typo to gitignore
### Added
- Icons and meta to src/shared/assets/meta
- ./resources for publicity stuff in readme

## [0.1.0] - 2019-05-08
### Added
- Full SSR HMR boilerplate created from previous work
- This changelog