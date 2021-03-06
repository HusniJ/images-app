import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import { Spinner, Button } from 'reactstrap';
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage'

const SelectImages = ({ userId, setUserImages, userImages, clearUserId }) => {
    // const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [defaultImages, setDefaultImages] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [isImageExists, setIsImageExists] = useState(false);



    useEffect(() => {
        if (userId === null) return;

        // fetch User Images
        const fetchUserImages = () => {
            setIsLoading(true);
            let images = [];
            axios.get(`user/images/find/${userId}`)
                .then((response) => {
                    if (response?.data?.imagePaths?.length > 0) {
                        response.data.imagePaths.map(item => {
                            images.push({
                                src: item,
                                width: 1,
                                height: 1
                            });
                            return item;
                        })
                    }
                    setUserImages(images);
                    setIsImageExists(images.length > 0);
                })
                .catch((error) => {
                    toast.error(error.message)
                }).finally(() => {
                    setIsLoading(false);
                });
        }

        fetchUserImages();
    }, [userId])



    useEffect(() => {
        if (userImages.length !== 0) {
            return;
        }

        // fetch Default Images to set for the User
        const fetchDefaultImages = () => {
            if (userId === null) return;
            const images = [];
            setIsLoading(true);
            axios.get("https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json")
                .then((response) => {
                    response.data?.entries.map(entry => {
                        images.push({
                            src: entry.picture,
                            width: 1,
                            height: 1
                        });
                        return entry;
                    })
                    setDefaultImages(images);
                })
                .catch((error) => {
                    toast.error(error.message)
                }).finally(() => {
                    setIsLoading(false);
                });
        }

        fetchDefaultImages();
    }, [userImages])

    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
            <SelectedImage
                selected={false}
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
                toggleImageSelection={toggleImageSelection}
            />
        ),
        []
    );

    const toggleImageSelection = (isSelected, index) => {
        if (isSelected) {
            setSelectedIndex(prev => [...prev, index]);
            return;
        }
        setSelectedIndex(prev => prev.filter((e) => (e !== index)));
    }

    const saveImages = () => {
        if (selectedIndex.length === 0) {
            toast.error('Please Select Images');
            return;
        }

        if (selectedIndex.length !== 9) {
            toast.error('Please Select only 9 Images');
            return;
        }

        const selectedImages = [];
        const updatedImages = [];
        selectedIndex.map(i => {
            selectedImages.push(defaultImages[i].src);
            updatedImages.push({
                src: defaultImages[i].src,
                width: 1,
                height: 1
            });
            return i;
        })

        setIsLoading(true);
        if (!isImageExists) {
            axios.post("/user/images/insert", {
                userId: userId,
                imagePaths: selectedImages
            }).then(() => {
                toast.success("Successfully Saved");
                setSelectedIndex([]);
            }).catch((error) => {
                toast.error(error.message);
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            axios.put("/user/images/update", {
                userId: userId,
                imagePaths: selectedImages
            }).then(() => {
                toast.success("Successfully Updated");
                setSelectedIndex([]);
            }).catch((error) => {
                toast.error(error.message);
            }).finally(() => {
                setIsLoading(false);
            });
        }
        setUserImages(updatedImages);
    }

    if (userId === null) return '';
    if (userImages.length !== 0) return '';

    return (
        <div>
            {
                isLoading ? <Spinner color="primary" /> :
                    <div>
                        <div>
                            <Button color="primary" onClick={saveImages}>Save Images</Button>
                            {' '}
                            <Button color="primary" onClick={clearUserId}>Change User</Button>
                        </div>
                        <div className="Image-gallery-container">
                            <Gallery photos={defaultImages} renderImage={imageRenderer} />
                        </div>
                    </div>
            }
        </div>
    );
}

export default SelectImages;