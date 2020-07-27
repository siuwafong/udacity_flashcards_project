const generateID = () => {
    return String(Math.floor(Math.random() * 1000000000))
}

export default generateID;