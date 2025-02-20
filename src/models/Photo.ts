export interface Photo {
    id: string,
    urls: {
        small: string,
        regular: string,
    },
    user: {
        username: string,
        profile_image: {
            medium: string,
        },
        name: string,
        instagram_username: string,
    },
    created_at: string,
    likes: number,
    alt_description: string
}