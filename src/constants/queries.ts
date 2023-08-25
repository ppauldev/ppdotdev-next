export const queryPostsAll = `
{
  posts {
    id
    title
    date
    body
    preview
    slug
    type
    image {
      url(
        transformation: {
          image: {resize: {width: 600, height: 400, fit: clip}}
        }
      )
    }
    imageSource
    imageLicense
  }
}
`

export const queryPostsCleanCode = `
{
  posts(where: { type: "cleancode" }) {
    id
    title
    date
    body
    preview
    slug
    type
    image {
      url(
        transformation: {
          image: {resize: {width: 600, height: 400, fit: clip}}
        }
      )
    }
    imageSource
    imageLicense
  }
}
`

export const queryPostsCoffee = `
{
  posts(where: { type: "bookscoffee" }) {
    id
    title
    date
    body
    preview
    slug
    type
    image {
      url(
        transformation: {
          image: {resize: {width: 600, height: 400, fit: clip}}
        }
      )
    }
    imageSource
    imageLicense
  }
}
`

export const queryPostsProtocols = `
{
  posts(where: { type: "protocols" }) {
    id
    title
    date
    body
    preview
    slug
    type
    image {
      url(
        transformation: {
          image: {resize: {width: 600, height: 400, fit: clip}}
        }
      )
    }
    imageSource
    imageLicense
  }
}
`

export const queryPostsResearch = `
{
  posts(where: { type: "research" }) {
    id
    title
    date
    body
    preview
    slug
    type
    image {
      url(
        transformation: {
          image: {resize: {width: 600, height: 400, fit: clip}}
        }
      )
    }
    imageSource
    imageLicense
  }
}
`

export const queryPostsTesting = `
{
  posts(where: { type: "testing" }) {
    id
    title
    date
    body
    preview
    slug
    type
    image {
      url(
        transformation: {
          image: {resize: {width: 600, height: 400, fit: clip}}
        }
      )
    }
    imageSource
    imageLicense
  }
}
`