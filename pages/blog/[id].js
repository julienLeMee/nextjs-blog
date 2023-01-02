import Link from 'next/link'

export default function Post({post}) { // on récupère le post en paramètre

    return (
      <>
        <main>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <Link href="/" className='btn'>BACK</Link>
        </main>
      </>
    )
  }

  export async function getStaticProps({params}) { // params contient les paramètres de la route (ici id)
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`) // on récupère le post en fonction de l'id
        .then(r => r.json())
    return {
      props: {
        post
      }
    }
  }

  export async function getStaticPaths() { // permet de générer les pages statiquement
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
        .then(r => r.json())
    return {
      paths: posts.map(post => ({
        params: {id: post.id.toString()} // on génère les pages en fonction de l'id
      })),
      fallback: false // si on ne trouve pas la page, on affiche une 404
    }
  }
