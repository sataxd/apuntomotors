import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, MessageCircle } from 'lucide-react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import HtmlContent from './Utils/HtmlContent';
import Tippy from '@tippyjs/react';
import Header from './components/Tailwind/Header';
import Footer from './components/Tailwind/Footer';
import { CarritoProvider } from './context/CarritoContext';

const BlogArticle = ({ previousArticle, article, nextArticle, showSlogan = true }) => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article?.name || '');

  const socialShareLinks = {
    x: `https://x.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${article?.name || ''} ${window.location.href}`)}`,
  };

  const articleDate = article?.post_date || article?.created_at;

  return (
    <>
      <Header showSlogan={showSlogan} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-[5%] bg-white mt-16"
      >
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500 font-dmsans">
            <ol className="flex items-center space-x-2 flex-wrap">
              <li><a href="/" className="hover:text-[#dd0613] transition-colors">Inicio</a></li>
              <li><span>/</span></li>
              <li><a href="/blog" className="hover:text-[#dd0613] transition-colors">Blog</a></li>
              <li><span>/</span></li>
              <li className="text-gray-800 font-medium truncate max-w-xs sm:max-w-md">{article?.name}</li>
            </ol>
          </nav>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {article?.category?.name && (
              <span className="inline-block px-3 py-1 text-xs font-medium text-white uppercase bg-slate-600 rounded-full font-dmsans">
                {article.category.name}
              </span>
            )}
            <h1 className="mt-4 font-sora text-black text-3xl sm:text-4xl 4xl:text-5xl font-semibold tracking-tight mb-4 !leading-tight">
              {article?.name}
            </h1>
            <div className="flex items-center mt-2 text-sm text-slate-500 font-dmsans">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {articleDate ? moment(articleDate).format('LL') : ''}
            </div>
          </motion.div>

          {article?.image && (
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              src={`/api/posts/media/${article.image}`}
              alt={article.name || 'Portada del artículo'}
              className="w-full h-auto rounded-lg shadow-lg mb-8 object-cover object-center aspect-video"
            />
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="prose max-w-none ql-editor font-dmsans"
          >
            <HtmlContent html={article?.description} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-6 border-t border-slate-200"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center flex-wrap gap-2">
                <svg className="w-5 h-5 mr-1 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {article?.tags?.filter(x => x.visible && x.status).map((x, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    {x.name?.trim()}
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <span className="mr-3 font-medium">Compartir:</span>
                <div className="flex space-x-2">
                  <Tippy content="Compartir en X">
                    <a href={socialShareLinks.x} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-100 text-black hover:text-gray-700 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1668.56 1221.19">
                        <path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
                      h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"/>
                      </svg>
                    </a>
                  </Tippy>
                  <Tippy content="Compartir en Facebook">
                    <a href={socialShareLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors duration-200">
                      <Facebook size={18} />
                    </a>
                  </Tippy>
                  <Tippy content="Compartir en WhatsApp">
                    <a href={socialShareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-green-50 text-green-500 hover:text-green-600 transition-colors duration-200">
                      <MessageCircle size={18} />
                    </a>
                  </Tippy>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 text-sm font-medium font-dmsans"
          >
            {previousArticle ? (
              <Tippy content={previousArticle.name}>
                <a href={`/blog/${previousArticle.slug || previousArticle.id}`} className="text-amber-500 hover:text-amber-600 transition-colors duration-200 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Publicación anterior
                </a>
              </Tippy>
            ) : <span />}

            {nextArticle ? (
              <Tippy content={nextArticle.name}>
                <a href={`/blog/${nextArticle.slug || nextArticle.id}`} className="text-amber-500 hover:text-amber-600 transition-colors duration-200 flex items-center">
                  Publicación siguiente
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Tippy>
            ) : <span />}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <CarritoProvider>
      <Base {...properties}>
        <BlogArticle {...properties} />
      </Base>
    </CarritoProvider>
  );
});