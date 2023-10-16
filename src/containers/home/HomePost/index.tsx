import PostItem from 'src/components/PostItem';
import { useLazyGetGreenNewsQuery } from 'src/services/greenNews';
import { usePostLoginMutation } from 'src/services/auth';
import { useEffect, useMemo } from 'react';
import AOS from 'aos';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
function HomePost() {
  const [postLogin] = usePostLoginMutation();
  const [getData, { data }] = useLazyGetGreenNewsQuery();

  useEffect(() => {
    getData();
    // AOS.init()
  }, []);

  // const handleLogin = async () => {
  //     const response = await postLogin({
  //         userName: "adminfo@aegona.com",
  //         password: "123456789@Abc",
  //         firebaseToken: "string"
  //     }).unwrap()

  //     if (response) {
  //         localStorage.setItem('access_token_fo', response?.data?.token)
  //         getData()
  //     }
  // }

  const postItemsMemo = useMemo(() => {
    return data?.map((post: any, index: number) => {
      return (
        <SwiperSlide key={post.id}>
          <div className=''>
            <PostItem
              key={post.id}
              link={post?.pdfLink ? post.pdfLink : post.link}
              description={post?.description}
              title={post?.title}
              image={post.imageLink}
            />
          </div>
        </SwiperSlide>
      );
    });
  }, [data]);

  return (
    // data-aos="fade-up"
    //         data-aos-anchor-placement="center-bottom"
    //         data-aos-duration="200"
    <article className="container-custom none pb-20 home__news">
      <h1 className="color-primary font-bold uppercase text-center mb-8 text-2xl tablet:text-4xl">
        bản tin xanh
      </h1>

      {/* <div className={`grid laptop:grid-cols-2 tablet:grid-cols-2 mobile:grid-cols-1 gap-6`}>
        {data?.map((post: any, index: number) => {
          return (
            <PostItem
              key={post.id}
              link={post?.pdfLink ? post.pdfLink : post.link}
              description={post?.description}
              title={post?.title}
              image={post.imageLink}
            />
          );
        })}
      </div> */}
      <Swiper
            modules={[Pagination, Navigation]}
            navigation={true}
            slidesPerView={3}
            spaceBetween={50}
            pagination={{ clickable: true }}
          >
            {postItemsMemo}
          </Swiper>
    </article>
  );
}

export default HomePost;
