import React from "react"
import HtmlContent from "../../Utils/HtmlContent"

const PostCard = ({id, name,slug, summary, category, image, post_date, created_at, firstImage = false }) => {
  return <div className="flex flex-col self-stretch my-auto w-full mt-6">
    <a href={`/blog/${slug}`} >
      <div className={`flex flex-col gap-4 ${firstImage && 'flex-col-reverse'}`}>
        
        <div className="flex flex-col w-full gap-2 lg:gap-3 4xl:gap-4">
          <h2 className="font-sora text-black text-xl sm:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight line-clamp-2">
              {name || 'Sin titulo'}
          </h2>
          <p className="font-dmsans text-black text-sm xl:text-base 4xl:text-xl line-clamp-2">
              {summary || 'Sin descripción'}
          </p>
        </div>

        <div className="flex justify-between items-center  w-full gap-4">
          <span className="flex gap-2 items-center font-dmsans font-semibold text-black text-sm xl:text-base 4xl:text-xl line-clamp-1">
            <span>{category?.name || 'Sin categoría'}</span>
          </span>
          <span className="text-xs sm:text-sm text-end font-dmsans font-semibold leading-snug text-[#dd0613]">
            {moment(created_at).format('ll')}
          </span>
        </div>

        <div className="flex flex-col w-full">
          <img src={`/api/posts/media/${image}`} alt={name} className="w-full h-full aspect-[3/2] object-cover rounded-md" />
        </div>

      </div>
    </a>
  </div>
}

export default PostCard