import React from "react";

const PostCard = ({ id, name, slug, summary, category, image, created_at, firstImage = false }) => {
  return (
    <div className="flex flex-col self-stretch my-auto w-full mt-6">
      <a href={`/blog/${slug}`} className="group">
        <div className={`flex flex-col gap-4 ${firstImage ? 'flex-col-reverse' : ''}`}>
          
          <div className="flex flex-col w-full gap-2 lg:gap-3 4xl:gap-4">
            {/* Se cambia a h3 para mantener una jerarquía limpia en listas/grids */}
            <h3 className="font-sora text-black text-xl sm:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight line-clamp-2 group-hover:text-[#dd0613] transition-colors">
              {name || 'Sin título'}
            </h3>
            <p className="font-dmsans text-black text-sm xl:text-base 4xl:text-xl line-clamp-2">
              {summary || 'Sin descripción'}
            </p>
          </div>

          <div className="flex justify-between items-center w-full gap-4">
            <span className="flex gap-2 items-center font-dmsans font-semibold text-black text-sm xl:text-base 4xl:text-xl line-clamp-1">
              <span>{category?.name || 'Sin categoría'}</span>
            </span>
            <span className="text-xs sm:text-sm text-end font-dmsans font-semibold leading-snug text-[#dd0613]">
              {created_at ? moment(created_at).format('ll') : ''}
            </span>
          </div>

          <div className="flex flex-col w-full overflow-hidden rounded-md">
            <img 
              src={`/api/posts/media/${image}`} 
              alt={`Imagen de portada para ${name}`} 
              loading="lazy"
              className="w-full h-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

        </div>
      </a>
    </div>
  );
};

export default PostCard;