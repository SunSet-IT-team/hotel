import { RatingWords } from '../model/types';

export function ratingToGrade(rating: number): RatingWords | null {
    if (typeof rating === 'number') {
        console.log(1);

        if (rating < 5) return RatingWords.BAD;
        else if (rating < 6) return RatingWords.NORMAL;
        else if (rating < 9) return RatingWords.GOOD;
        return RatingWords.GREAT;
    }
    return null;
}
