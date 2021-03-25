import { Button } from "reactstrap";
import Gallery from "react-photo-gallery";

const ShowImages = ({ userId, userImages, clearImages, clearUserId }) => {
    if (userId === null) return '';
    if (userImages.length === 0) return '';

    return (
        <div>
            <div>
                <Button color="primary" onClick={() => clearImages()}>Update Images</Button>
                {' '}
                <Button color="primary"onClick={() => clearUserId()}>Change User</Button>
            </div>
            { userImages.length > 0 &&
                <div className="Image-gallery-container">
                    <Gallery photos={userImages} />
                </div>}
        </div>
    )
}

export default ShowImages;