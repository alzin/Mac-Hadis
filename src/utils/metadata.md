# Metadata Configuration in Next.js

This repository contains the type definition for `PageMetadata` that allows for configuring metadata in Next.js applications. Metadata can include titles, descriptions, author information, OpenGraph data, and more. This structure provides flexibility to define and customize the metadata to optimize the application for SEO, social sharing, and other purposes.

## Table of Contents

- [Overview](#overview)
- [Metadata Fields](#metadata-fields)
  - [metadataBase](#1-metadatabase)
  - [title](#2-title)
  - [description](#3-description)
  - [applicationName](#4-applicationName)
  - [authors](#5-authors)
  - [generator](#6-generator)
  - [keywords](#7-keywords)
  - [referrer](#8-referrer)
  - [themeColor](#9-themeColor)
  - [colorScheme](#10-colorScheme)
  - [viewport](#11-viewport)
  - [creator](#12-creator)
  - [publisher](#13-publisher)
  - [robots](#14-robots)
  - [alternates](#15-alternates)
  - [icons](#16-icons)
  - [manifest](#17-manifest)
  - [openGraph](#18-openGraph)
  - [twitter](#19-twitter)
  - [facebook](#20-facebook)
  - [verification](#21-verification)
  - [appleWebApp](#22-appleWebApp)
  - [formatDetection](#23-formatDetection)
  - [itunes](#24-itunes)
  - [abstract](#25-abstract)
  - [appLinks](#26-appLinks)
  - [archives](#27-archives)
  - [assets](#28-assets)
  - [bookmarks](#29-bookmarks)
  - [pagination](#30-pagination)
  - [category](#31-category)
  - [classification](#32-classification)
  - [other](#33-other)
- [Example Usage](#example-usage)
- [Notes](#notes)

## Overview

`PageMetadata` provides a type-safe interface for adding various metadata properties to a Next.js page. These metadata properties can control the document's `<title>`, `<meta>` tags for SEO, OpenGraph tags for social sharing, and additional attributes for various social media platforms.

## Metadata Fields

### 1. `metadataBase`

- **Type**: `null | URL | undefined`
- **Description**: The base path and origin for absolute URLs for various metadata links like OpenGraph images.

### 2. `title`

- **Type**: `null | string | { default: string; template: string } | { absolute: string; template: string | null } | { absolute: string } | undefined`
- **Description**: The document title for the page. It can be set as a static string, or with a template.

### 3. `description`

- **Type**: `null | string | undefined`
- **Description**: The document description and optionally OpenGraph and Twitter descriptions.

### 4. `applicationName`

- **Type**: `null | string | undefined`
- **Description**: The name of the application.

### 5. `authors`

- **Type**: `null | { url?: string | URL; name?: string } | { url?: string | URL; name?: string }[] | undefined`
- **Description**: The authors of the document, with optional URLs.

### 6. `generator`

- **Type**: `null | string | undefined`
- **Description**: The generator used for the document, such as the framework.

### 7. `keywords`

- **Type**: `null | string | Array<string> | undefined`
- **Description**: The keywords associated with the document, used for SEO purposes.

### 8. `referrer`

- **Type**: `null | 'no-referrer' | 'origin' | 'no-referrer-when-downgrade' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | undefined`
- **Description**: The referrer setting for the document.

### 9. `themeColor`

- **Type**: `null | string | { color: string; media?: string } | { color: string; media?: string }[] | undefined`
- **Description**: The theme color for the document. This can be set based on the color scheme preference (e.g., dark mode).

### 10. `colorScheme`

- **Type**: `null | 'normal' | 'light' | 'dark' | 'light dark' | 'dark light' | 'only light' | undefined`
- **Description**: The color scheme for the document. Deprecated in favor of using the `viewport` object.

### 11. `viewport`

- **Type**: `null | string | { width?: string | number; height?: string | number; initialScale?: number; minimumScale?: number; maximumScale?: number; userScalable?: boolean; viewportFit?: 'auto' | 'cover' | 'contain'; interactiveWidget?: 'resizes-visual' | 'resizes-content' | 'overlays-content' } | undefined`
- **Description**: The viewport settings for the document.

### 12. `creator`

- **Type**: `null | string | undefined`
- **Description**: The creator of the document.

### 13. `publisher`

- **Type**: `null | string | undefined`
- **Description**: The publisher of the document.

### 14. `robots`

- **Type**: `null | string | { googleBot?: string; } | undefined`
- **Description**: The robots meta tag for search engines.

### 15. `alternates`

- **Type**: `null | { canonical?: string | URL; languages?: Languages[]; media?: { [media: string]: string | URL }[]; types?: { [types: string]: string | URL }[] } | undefined`
- **Description**: The canonical and alternate URLs for the document.

### 16. `icons`

- **Type**: `null | IconURL | Array<Icon> | Icons | undefined`
- **Description**: The icons for the document (e.g., favicon, Apple touch icon).

### 17. `manifest`

- **Type**: `null | string | URL | undefined`
- **Description**: The web application manifest for the document.

### 18. `openGraph`

- **Type**: `null | OpenGraph | undefined`
- **Description**: The Open Graph metadata for social sharing.

### 19. `twitter`

- **Type**: `null | Twitter | undefined`
- **Description**: The Twitter metadata for the document.

### 20. `facebook`

- **Type**: `null | { appId: string; admins?: never; } | { appId?: never; admins: string | string[]; } | undefined`
- **Description**: The Facebook metadata for the document.

### 21. `verification`

- **Type**: `null | { google?: string | number | (string | number)[] | undefined; yahoo?: string | number | (string | number)[] | undefined; yandex?: string | number | (string | number)[] | undefined; me?: string | number | (string | number)[] | undefined; other?: { [name: string]: string | number | (string | number)[] } } | undefined`
- **Description**: Verification tokens for various platforms (e.g., Google, Yandex).

### 22. `appleWebApp`

- **Type**: `null | boolean | { capable?: boolean; title?: string; startupImage?: string | { url: string; media?: string; }; statusBarStyle?: 'default' | 'black' | 'black-translucent' } | undefined`
- **Description**: Apple web app metadata, including capabilities and status bar style.

### 23. `formatDetection`

- **Type**: `null | { telephone?: boolean; date?: boolean; address?: boolean; email?: boolean; url?: boolean; } | undefined`
- **Description**: Controls whether devices should interpret certain formats (e.g., telephone numbers, email).

### 24. `itunes`

- **Type**: `null | { appId: string; appArgument?: string; } | undefined`
- **Description**: iTunes App metadata for the document.

### 25. `abstract`

- **Type**: `null | string | undefined`
- **Description**: A brief description of the document. This is superseded by the `description` field.

### 26. `appLinks`

- **Type**: `null | AppLinks | undefined`
- **Description**: The Facebook AppLinks metadata for the document.

### 27. `archives`

- **Type**: `null | string | Array<string> | undefined`
- **Description**: The archives link rel property.

### 28. `assets`

- **Type**: `null | string | Array<string> | undefined`
- **Description**: The assets link rel property.

### 29. `bookmarks`

- **Type**: `null | string | Array<string> | undefined`
- **Description**: The bookmarks link rel property.

### 30. `pagination`

- **Type**: `null | { previous?: string | URL; next?: string | URL; } | undefined`
- **Description**: Pagination link rel properties.

### 31. `category`

- **Type**: `null | string | undefined`
- **Description**: The category meta name property.

### 32. `classification`

- **Type**: `null | string | undefined`
- **Description**: The classification meta name property.

### 33. `other`

- **Type**: `({ [name: string]: string | number | Array<string | number>; } & DeprecatedMetadataFields) | undefined`
- **Description**: Arbitrary name/value pairs for the document.

## Example Usage

```tsx
const pageMetadata: PageMetadata = {
  title: {
    default: "My Blog",
    template: "%s | My Website",
  },
  description: "This is a description of my blog.",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "My Blog",
    description: "This is my blog",
    siteName: "My Website",
    images: [
      {
        url: "https://example.com/og-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mywebsite",
    creator: "@creator",
    images: "https://example.com/og-image.jpg",
  },
};
```
