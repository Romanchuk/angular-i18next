## [5.0.2](https://github.com/Romanchuk/angular-i18next/compare/v5.0.1...v5.0.2) (2018-12-03)


### Bug Fixes

* package.json ([54a8c37](https://github.com/Romanchuk/angular-i18next/commit/54a8c37))



## [5.0.1](https://github.com/Romanchuk/angular-i18next/compare/v5.0.0...v5.0.1) (2018-11-28)



# [5.0.0](https://github.com/Romanchuk/angular-i18next/compare/v5.0.0-beta2...v5.0.0) (2018-11-28)



# [5.0.0-beta2](https://github.com/Romanchuk/angular-i18next/compare/v5.0.0-beta...v5.0.0-beta2) (2018-11-28)



# [5.0.0-beta](https://github.com/Romanchuk/angular-i18next/compare/v4.0.0...v5.0.0-beta) (2018-11-28)


### Bug Fixes

* docs ([220a0b8](https://github.com/Romanchuk/angular-i18next/commit/220a0b8))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/Romanchuk/angular-i18next/compare/v4.0.0-beta...v4.0.0) (2018-06-25)

In v4 passed through most of i18next api methods

1. Update angular to v6+
2. Update rxjs to v6.2.0+


<a name="4.0.0-beta"></a>
# [4.0.0-beta](https://github.com/Romanchuk/angular-i18next/compare/v3.4.2...v4.0.0-beta) (2018-06-11)



<a name="3.4.2"></a>
## [3.4.2](https://github.com/Romanchuk/angular-i18next/compare/v3.4.1...v3.4.2) (2018-05-05)



<a name="3.4.1"></a>
## [3.4.1](https://github.com/Romanchuk/angular-i18next/compare/v3.4.0...v3.4.1) (2018-04-29)

- default formater fixes


<a name="3.4.0"></a>
# [3.4.0](https://github.com/Romanchuk/angular-i18next/compare/v3.3.0...v3.4.0) (2018-04-29)

- i18next v11 support 
- fix: [format pipe](https://github.com/Romanchuk/angular-i18next/issues/15)


<a name="3.3.0"></a>
# [3.3.0](https://github.com/Romanchuk/angular-i18next/compare/v3.3.0-beta.2...v3.3.0) (2018-03-12)

- added umd bundle
- comments cleanup
- updated dev dependencies

<a name="3.3.0-beta.2"></a>
# [3.3.0-beta.2](https://github.com/Romanchuk/angular-i18next/compare/v3.3.0-beta.1...v3.3.0-beta.2) (2018-03-12)



<a name="3.3.0-beta.1"></a>
# [3.3.0-beta.1](https://github.com/Romanchuk/angular-i18next/compare/v3.2.0...v3.3.0-beta.1) (2018-02-04)



<a name="3.2.0"></a>
# [3.2.0](https://github.com/Romanchuk/angular-i18next/compare/v3.1.1...v3.2.0) (2018-01-17)

### Bug Fixes
* [aot build failed](Romanchuk/angular-i18next#10)

### Breaking changes

Removed parameter 'localizeTitle' from forRoot method.
You need to manually resolve Title as I18NextTitle for same behavior.


<a name="3.1.1"></a>
## [3.1.1](https://github.com/Romanchuk/angular-i18next/compare/v3.1.0...v3.1.1) (2018-01-01)


### Bug Fixes

* bug namespace fallback ([a16b067](https://github.com/Romanchuk/angular-i18next/commit/a16b067))
* conventional-github-releaser run ([df3bb84](https://github.com/Romanchuk/angular-i18next/commit/df3bb84))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/Romanchuk/angular-i18next/compare/v3.0.0...v3.1.0) (2017-12-22)

It is possible to pass array of namespaces (or scopes). [Key would fallback](https://www.i18next.com/api.html#t) to next namespace in array if the previous failed to resolve.

`[feature.validators:key, validators:key]`
```typescript
{
  provide: I18NEXT_NAMESPACE,
  useValue: ['feature.validators', 'validators']
}
```

<a name="3.0.0"></a>
# [3.0.0](https://github.com/Romanchuk/angular-i18next/compare/v3.0.0-alpha.2...v3.0.0) (2017-12-15)



<a name="3.0.0-alpha.2"></a>
# [3.0.0-alpha.2](https://github.com/Romanchuk/angular-i18next/compare/v3.0.0-alpha...v3.0.0-alpha.2) (2017-12-05)



<a name="3.0.0-alpha"></a>
# [3.0.0-alpha](https://github.com/Romanchuk/angular-i18next/compare/v2.0.0...v3.0.0-alpha) (2017-11-27)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/Romanchuk/angular-i18next/compare/v2.0.0-beta2...v2.0.0) (2017-11-14)



<a name="2.0.0-beta2"></a>
# [2.0.0-beta2](https://github.com/Romanchuk/angular-i18next/compare/v2.0.0-beta...v2.0.0-beta2) (2017-11-05)



<a name="2.0.0-beta"></a>
# [2.0.0-beta](https://github.com/Romanchuk/angular-i18next/compare/v1.1.0...v2.0.0-beta) (2017-11-05)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/Romanchuk/angular-i18next/compare/v1.0.2...v1.1.0) (2017-11-04)



<a name="1.0.2"></a>
## [1.0.2](https://github.com/Romanchuk/angular-i18next/compare/v1.0.1...v1.0.2) (2017-09-22)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/Romanchuk/angular-i18next/compare/v1.0.0...v1.0.1) (2017-09-21)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/Romanchuk/angular-i18next/compare/v0.2.4...v1.0.0) (2017-09-21)



<a name="0.2.4"></a>
## [0.2.4](https://github.com/Romanchuk/angular-i18next/compare/v0.2.3...v0.2.4) (2017-06-29)



<a name="0.2.3"></a>
## [0.2.3](https://github.com/Romanchuk/angular-i18next/compare/v0.2.2...v0.2.3) (2017-06-29)



<a name="0.2.2"></a>
## [0.2.2](https://github.com/Romanchuk/angular-i18next/compare/v0.2.1...v0.2.2) (2017-06-29)


### Bug Fixes

* **I18NextService:** context-safe calls of i18next methods ([455a07d](https://github.com/Romanchuk/angular-i18next/commit/455a07d))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/Romanchuk/angular-i18next/compare/v0.2.0...v0.2.1) (2017-06-29)


### Bug Fixes

* **package:** return back required exports ([fb7ead6](https://github.com/Romanchuk/angular-i18next/commit/fb7ead6))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/Romanchuk/angular-i18next/compare/0.1.0...0.2.0) (2017-06-28)


### Features

* **package:** AOT support added ([fc1f66d](https://github.com/Romanchuk/angular-i18next/commit/fc1f66d))



