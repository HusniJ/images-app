import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage'

const SelectImages = (props) => {
    const { userId, setUserImages, userImages } = props;
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [defaultImages, setDefaultImages] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState([]);

    useEffect(() => {
        if (userId === null) return;
        const fetchUserImages = async () => {
            try {
                setIsLoading(true);
                let userImages = await axios.get(`user/images/find/${userId}`);
                setUserImages(userImages.data);
            } catch (error) {
                toast.error(error?.message)
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserImages();
    }, [userId])

    useEffect(() => {
        if (userImages.length !== 0) {
            return;
        }

        const fetchDefaultImages = async () => {
            try {
                setIsLoading(true);
                let defaultImages = await axios.get("https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json");
                const images = [];
                defaultImages.data?.entries.map(entry => {
                    images.push({
                        src: entry.picture,
                        width: 1,
                        height: 1
                    });
                })
                setDefaultImages(images);
            } catch (error) {
                toast.error(error?.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDefaultImages();
    }, [userImages])

    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
          <SelectedImage
            selected={selectAll ? true : false}
            key={key}
            margin={"2px"}
            index={index}
            photo={photo}
            left={left}
            top={top}
            setSelectedIndex={setSelectedIndex}
            selectedIndexes={selectedIndex}
          />
        ),
        [selectAll]
      );

    const clickImage = (index) => {
        console.log('Clicke', index);
    }

    if (userId === null) return '';
    if (userImages.length !== 0) return '';

    return (
        <div>
            {
                isLoading ? <Spinner color="primary" /> :
                    <div>
                        <Gallery photos={defaultImages} renderImage={imageRenderer} onClick={clickImage} />
                    </div>
            }
        </div>
    );
}

export default SelectImages;