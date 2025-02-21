import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

const StarRatingComponent = ({rating,handleRatingChange}) => {
    return (
        [1, 2, 3, 4, 5].map((star) => <Button
        className={` fill-blue-900 p-2 rounded-full transition-colors ${star <= rating ?'text-yellow-500 hover:bg-slate-200':'text-black hover:bg-slate-200 hover:text-blue-900 '} `}
        size="icon"
        onClick={handleRatingChange?()=>handleRatingChange(star):null}
        >
            <StarIcon className={`w-5 h-5 ${star<=rating ?'fill-yellow-500':'fill-slate-100'} `}  />
        </Button>
        )

    )
}

export default StarRatingComponent
