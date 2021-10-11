import React from 'react'
import Navbar from '../../layout/Navbar' 
import Footer from '../../layout/Footer' 
import '../faq.css' ;


const AboutUs = () => {
  return (
    <div>
      <body>
        {/* <!-- START NAV -->*/}
        
        <Navbar/>


        {/* <!-- END NAV -->*/}

        <figure  className="image is-2016x700" className='hero is-info is-medium is-bold' >
        <img src="https://i.univbkstr.com/ubs-beta/img/tech/tech-front-2.jpg"/>
          {/*<div className='hero-body'>
            <div className='container has-text-centered'>
              <h1 className='title'>
              Rediscover a great shopping tradition.
              </h1>
            </div>
          </div>*/}
        </figure>

        <div className='container'>
          {/*<!-- START ARTICLE FEED --> */}
          <section className='articles'>
            <div className='column is-8 is-offset-2'>
              {/* <!-- START ARTICLE -->*/}
              <div className='card article'>
                <div className='card-content'>
                  <div className='media'>
                    <div className='media-content has-text-centered'>
                      <p className='title article-title'>
                        Introducing for Our Company
                      </p>
                      <div className='tags has-addons level-item'>
                        <span className='tag is-rounded is-info'>Established in</span>
                        <span className='tag is-rounded'>2005</span>
                      </div>
                    </div>
                  </div>
                  <div className='content article-body'>
                    <p>
                    Tech Gear Solutions has strived to be one of the leading retailers for branded & customizable computers and
                     related products in today’s market. Our many years of experience has 
                    provided us with the expertise to cater you; our valued customers with the latest technology,
                     while providing an excellent service that would culminate in providing you the best available products.
                     Nanotek Computer Solutions has always been the stable backdrop for many PC enthusiasts in the 
                     face of rising enthusiasm for high-end computer gaming and custom-built PCs. Thus, enabling the dreams 
                     of making one's own computer that would fit all of one's needs come true..{' '}

                    </p>
                    <p>
                    We believe in your passion, as fellow Tech enthusiasts, we would be more than glad to provide you with any assistance when 
                    you're looking for branded computer solutions. If you visit our store, it would be possible
                     for you to see for yourself the latest products that we have in our showroom, sourced from the international market.
                       We specialize in making available the latest technology as soon as it is released worldwide. In fact,
                      you would be able to observe that most products on our shelves are less than 30 days old! It is this
                       quality and the service that has earned Nanotek Computer Solutions the untarnished reputation that it has had throughout the years.
                    </p>
                    <h3 className='has-text-centered'>
                      Our customers are our great asset.
                    </h3>
                    <p>
                      {' '}
                      Always trying to supply best products for our customers.Currently We having, {' '}
                      <pre className='has-text-centered'>more than 40,000 Customers</pre>
                      Voluptat ut farmacium tellus in metus vulputate. Feugiat
                      in fermentum posuere urna nec. Pharetra convallis posuere
                      morbi leo urna molestie. Accumsan lacus vel facilisis
                      volutpat est velit egestas. Fermentum leo vel orci porta.
                      Faucibus interdum posuere lorem ipsum.
                    </p>
                  </div>
                </div>
              </div>
              {/*<!-- END ARTICLE --> */}
              {/* <!-- START ARTICLE -->*/}
              <div className='card article'>
                <div className='card-content'>
                  <div className='media'>
                    <div className='' className='media-center'>
                      <img
                        src='https://www.alexanderhughes.com/wp-content/uploads/2014/10/RozetJulien01retNB6x8200.jpg'
                        className='author-image'
                        alt='Placeholder image'
                      />
                    </div>
                    <div className="columns is-vcentered"> 

                    </div>
                    <div className='media-content has-text-centered'>
                      <p className='title article-title'>
                        Kamal Semage 🔱
                      </p>

                      
                      <p className='subtitle is-6 article-subtitle'>
                        <a href='#'>CEO : KamalSemage</a>
                        <p className="column is-three-fifths is-offset-2 has-background-warning-light		"> 
                        Kulappu Arachchige Don Kamal Semage, known commonly 
                        as Kamal Semage (born December 28, 1967) is a Sri Lankan entrepreneur/business magnate 
                        and philanthropist, and Chairman/Managing Director of Vallibel One PLC. 
                        </p>
                        
                      
                        
                      </p>

                    
                      
                    </div>
                  </div>
                  <div className='content article-body'>
                    <p>
                    He also ran Tito Electronics, an electronic shop repairing electronic circuit board in Colpetty. He then ventured 
                    into gambling and started his own casino business in 1993 in Isurugiri. Kamal also started up business producing and selling neon bulbs in 1995,
                     at a time when none of the manufacturers were not keen on selling those bulbs. He also met then International Monetary Fund resident representative in Sri Lanka Nadeem Ul Haque in 1998 and developed strong bonds
                    </p>
                    <p>
                      He became the chairman of Lanka Tiles in 2017 and was appointed as the co-chairman of Singer (Sri Lanka) in October
                       2017 after Hayleys agreed to buy Singer.[16][17] Dhammika was appointed as the chairman of Director Board of Lanka Ceramic PLC in 
                       2017 but he resigned from the position on 31 August 2018.
                    </p>
                    <h3 className='has-text-centered has-background-primary-light	'>
                      Being able to Providing service to Sri Lankan people is great opportunity :Kamal Semage
                    </h3>
                    <p>
                    Technology today plays a significant role in evolving the world.  We at Nanotek Computer Solutions always execute our promises keeping you as our topmost priority, 
                    and we believe that adapting to the tech scene in the world on par with the international scale has given us the opportunity to be who we are today; a pioneer in the field of computer 
                    products in the country.
                    </p>
                  </div>
                </div>
              </div>
              {/*<!-- END ARTICLE --> */}
              {/*<!-- START PROMO BLOCK --> */}
              <section className='hero is-warning is-bold is-small promo-block '>
                <div className='hero-body'>
                  <div className='container'>
                    <h1 className='title'>
                      <i className='fa fa-bell-o'></i> Visit our store or Care Center and you will find a team of experts to offer best value for your money.
                    </h1>
                  
                  </div>
                </div>
              </section>
              {/* <!-- END PROMO BLOCK -->*/}
              {/*<!-- START ARTICLE --> */}
              
              {/*<!-- END ARTICLE --> */}
            </div>
          </section>
          {/*!-- END ARTICLE FEED --*/}
        </div>
        
        
      </body>
      <Footer/>
    </div>
  )
}

export default AboutUs
