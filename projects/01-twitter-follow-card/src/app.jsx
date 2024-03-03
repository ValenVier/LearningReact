import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
        userName: '_valenvier_',
        name: 'Javier Rodríguez Valentín',
        isFollowing: true
    },
    {
        userName: '_valenvier_',
        name: 'Javier Rodríguez Valentín',
        isFollowing: false
    },
    {
        userName: '_valenvier_',
        name: 'Javier Rodríguez Valentín',
        isFollowing: true
    },
    {
        userName: '_valenvier_',
        name: 'Javier Rodríguez Valentín',
        isFollowing: true
    }
]

export function App() {
    const format = (userName) => `@${userName}`
    return(
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing}) => {
                    return(
                        <TwitterFollowCard 
                            initialIsFollowing={isFollowing}
                            userName={userName}
                            key={userName}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    )
}

/* esta sección es la primera, se ha cambiado para renderizar los componentes como una lista 
en vez de generarlos a mano*/
{/* <section className='App'> */}
    {/* isFollowing={true} === isFollowing; línea 9 y 11 es lo mismo -> lo cambiamos a initialIsFollowing */}
    {/* <TwitterFollowCard formatUserName={format} initialIsFollowing={true} userName="_valenvier_" name="Javier Rodríguez Valentín" /> */}
    {/* <TwitterFollowCard formatUserName={format} initialIsFollowing={false} userName="_valenvier_" name="Javier Rodríguez Valentín" /> */}
    {/* <TwitterFollowCard formatUserName={format} initialIsFollowing userName="_valenvier_" name="Javier Rodríguez Valentín" /> */}
    {/* <TwitterFollowCard formatUserName={format} initialIsFollowing userName="_valenvier_">
        Javier Rodríguez Valentín */} {/* este children puede ser cualquier cosa, lo que va dentro del componente puede ser texto como este puede ser una etiquet h1, etc, incluso se puede meter otro componente */}
        {/* es mejor no incluir children como prop, hay que evitar esto ya que se puede acceder a él sin tenerlo como prop */}
    {/* </TwitterFollowCard> */}
/* </section> */