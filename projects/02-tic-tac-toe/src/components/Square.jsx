export const Square = ({children, isSelected, updateBoard, index}) => {
    const clasName = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div className={clasName} onClick={handleClick}>
        {children}
        </div>
    )
}