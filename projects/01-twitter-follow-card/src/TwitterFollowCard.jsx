import { useState } from "react" /* hooks */

export function TwitterFollowCard ({formatUserName, userName, name, initialIsFollowing, children}) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    /*destructuración
    const state = useState(false)
    const isFollowing = state[0]
    const setIsFollowing = state[1]
    */
    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing 
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar' src={`https://unavatar.io/${userName}/`} alt="Avatar" />
                <div className='tw-followCard-info'>
                    <strong>{name?name:children}</strong>
                    <span className='tw-followCard-infoUserName'>{/* {formatUserName(userName)} */} @{userName}</span>
                </div>
            </header>

            <aside>
                <button /* className='tw-followCard-button' */ className={buttonClassName} onClick={handleClick}>
                <span className='tw-followCard-text'>{text}</span>
                    <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}