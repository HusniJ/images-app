const ShowImages = (props) => {
    const { userId, userImages } = props;

    if (userId === null) return '';
    if (userImages.length === 0) return '';

    return <h1>Show Images</h1>
}

export default ShowImages;