import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import Banner from '../pages/banner.jpg'

class IndexRoute extends React.Component {
  render() {
    const items = []
    const { title, subtitle, copyright, url } = this.props.data.site.siteMetadata
    const twitterHandle = this.props.data.site.siteMetadata.author.twitter
    const posts = this.props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="google-site-verification" content="XVCaDE_hoNDn2qS20SdprrhdcUrscutVXd2dvjNvVgg" />
            <meta name="description" content={subtitle} />

            <meta property="og:title" content={title} />
            <meta property="og:type" content="blog" />
            <meta property="og:description" content={subtitle}/>
            <meta property="og:image" content={url + Banner} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={subtitle} />
            <meta name="twitter:image" content={url + Banner} />
          </Helmet>
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">{items}</div>
          </div>
        </div>
        <div>
          <p className="sidebar__copyright">{copyright}</p>
        </div>
      </Layout>
    )
  }
}

export default IndexRoute

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        url
        menu {
          label
          path
        }
        author {
          name
          email
          twitter
          github
          linkedin
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`
