const AdvertisementModel = require('../models/Advertisement');

class Advertisement {
    find(params) {
        const { shortText, description, userId, tags } = params;

        if(shortText || description || userId || Array.isArray(tags)) {
            return new Promise((resolve, reject) => {
                if(userId) {
                    const advertisement = AdvertisementModel.findOne({ userId });

                    if(advertisement) {
                        resolve(advertisement);
                    }
                } else {
                    const advertisements = AdvertisementModel.find(
                        {tags: {$all: [...tags]}},
                        {
                            shortText: `/^${shortText}$/i`
                        },
                        {
                            description: `/^${description}$/i`
                        });

                    if (advertisements) {
                        resolve(advertisements);
                    } else {
                        resolve(null);
                    }
                }
            });
        }
    }

     create(data) {
        const { shortText, description, images, userId, createdAt, updatedAt, tags, isDeleted } = data;

        return new Promise((resolve, reject) => {
            if(shortText && userId && createdAt && updatedAt && typeof isDeleted == 'boolean') {
                const newAdvertisement = new AdvertisementModel({
                    shortText,
                    description,
                    images,
                    userId,
                    createdAt,
                    updatedAt,
                    isDeleted,
                    tags
                });

                newAdvertisement.save().then(adv => {
                    console.log(adv);
                    resolve(adv);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                })
            } else {
                reject('Full all fields');
            }
        });
    }

    async remove(id) {
        return new Promise((resolve, reject) => {
            const advertisement = AdvertisementModel.findOneAndUpdate({userId: id}, {isDeleted: true});

            if(advertisement) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    }
}

module.exports = new Advertisement();