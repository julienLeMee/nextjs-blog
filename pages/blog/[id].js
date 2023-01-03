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

  // pour générer les pages statiquement, on utilise getStaticProps et getStaticPaths
  // getStaticProps permet de générer les pages statiquement
  // getStaticPaths permet de générer les pages en fonction des paramètres de la route

  // pour générer les pages dynamiquement, on utilise getServerSideProps
  // getServerSideProps permet de générer les pages dynamiquement
  // on ne peut pas utiliser getStaticPaths et getServerSideProps en même temps donc on supprimera getStaticPaths si on utilise getServerSideProps


// export async function getServerSideProps() { // permet de générer les pages statiquement
//     const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
//         .then(r => r.json())
//     return {
//       paths: posts.map(post => ({
//         params: {id: post.id.toString()} // on génère les pages en fonction de l'id
//       })),
//       fallback: false // si on ne trouve pas la page, on affiche une 404
//     }
//   }
