import { LibrarySerieContent } from '../collection/library-serie-content'
export interface LibraryContent {
    id?: number;
    isFavorite?: boolean;
    isPhysical?: boolean;
    isNumeric?: boolean;
    isWishlist?: boolean;
    localStorage?: string;
    creationDate?: string;
    creationUser?: string;
    lastUpdateDate?: string;
    lastUpdateUser?: string;
    librarySerieContent: LibrarySerieContent
}
