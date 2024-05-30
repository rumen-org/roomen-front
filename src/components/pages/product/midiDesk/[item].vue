<template>
    <div id="container">
        <div class="contents">
            <!-- conTopArea -->
            <div class="conTopArea">
                <div class="btnArea">
                    <button type="button" class="iconBtn back">돌아가기</button>
                </div>
            </div>
            <!--// conTopArea --> 
            <!-- productDetail -->
            <div class="productDetail">
                <!-- fixArea -->
                <div class="fixArea">
                    <!-- imgList -->
                    <div class="imgList">
                        <div class="preList">
                            <!-- <a href=""><img src="@/assets/images/img-product-4.png" alt=""></a>
                            <a href=""><img src="@/assets/images/img-product.jpg" alt=""></a>
                            <a href=""><img src="@/assets/images/img-product-4.png" alt=""></a>
                            <a href=""><img src="@/assets/images/img-product.png" alt=""></a>
                            <a href=""><img src="@/assets/images/img-product-5.png" alt=""></a> -->
                            <a href="#" v-for="(img, index) in images" :key="index" @click="setActiveImage($event, img.src)">
                                <img :src="img.src" :alt="img.alt">
                            </a>
                        </div>
                        <div class="preArea">
                            <!-- <img src="@/assets/images/img-product-4.png" alt=""> -->
                            <img :src="activeImage" alt="Active Image">
                        </div>
                    </div>
                    <!--// imgList -->

                    <!-- floatMenu -->
                    <div class="floatMenu">
                        <strong class="tit">루멘 미디데스크</strong>
                        <p class="subTit fontG">Roomen MIDI DESK</p>
                        <p class="price">
                            <span>₩ 1,350,000</span>
                            <del>₩ 1,550,000</del>
                        </p>
                        <div class="option">
                            <p>색상1 : 상판, 하부다리, 후면가림판, 상판, 하부다리, 후면가림판</p>
                            <!-- checkboxWrap -->
                            <div class="checkboxWrap">
                                <span class="checkbox noTxt white">
                                    <input type="radio" id="chk0101" name="chk01">
                                    <label for="chk0101">화이트</label>
                                </span>
                                <span class="checkbox noTxt black">
                                    <input type="radio" id="chk0102" name="chk01">
                                    <label for="chk0102">블랙</label>
                                </span>
                                <span class="checkbox noTxt gray">
                                    <input type="radio" id="chk0103" name="chk01">
                                    <label for="chk0103">그레이</label>
                                </span>
                                <span class="checkbox noTxt brown">
                                    <input type="radio" id="chk0104" name="chk01">
                                    <label for="chk0104">브라운</label>
                                </span>
                                <span class="checkbox noTxt beige">
                                    <input type="radio" id="chk0105" name="chk01">
                                    <label for="chk0105">베이지</label>
                                </span>
                                <span class="checkbox noTxt red">
                                    <input type="radio" id="chk0106" name="chk01">
                                    <label for="chk0106">레드</label>
                                </span>
                                <span class="checkbox noTxt blue">
                                    <input type="radio" id="chk0107" name="chk01">
                                    <label for="chk0107">블루</label>
                                </span>
                                <span class="checkbox noTxt yellow">
                                    <input type="radio" id="chk0108" name="chk01" checked>
                                    <label for="chk0108">옐로루</label>
                                </span>
                                <span class="checkbox noTxt green">
                                    <input type="radio" id="chk0109" name="chk01">
                                    <label for="chk0109">그린</label>
                                </span>
                                <span class="checkbox noTxt purple">
                                    <input type="radio" id="chk0110" name="chk01">
                                    <label for="chk0110">퍼플</label>
                                </span>
                            </div>
                            <!--// checkboxWrap -->
                        </div>
                        <div class="option">
                            <p>색상2 : 건반트레이, 다리, 상단선반, 칸막이, 상판, 하부다리, 후면가림판</p>
                            <!-- checkboxWrap -->
                            <div class="checkboxWrap">
                                <span class="checkbox noTxt white">
                                    <input type="radio" id="chk0201" name="chk02" checked>
                                    <label for="chk0201">화이트</label>
                                </span>
                                <span class="checkbox noTxt black">
                                    <input type="radio" id="chk0202" name="chk02">
                                    <label for="chk0202">블랙</label>
                                </span>
                                <span class="checkbox noTxt gray">
                                    <input type="radio" id="chk0203" name="chk02">
                                    <label for="chk0203">그레이</label>
                                </span>
                                <span class="checkbox noTxt brown">
                                    <input type="radio" id="chk0204" name="chk02">
                                    <label for="chk0204">브라운</label>
                                </span>
                                <span class="checkbox noTxt beige">
                                    <input type="radio" id="chk0205" name="chk02">
                                    <label for="chk0205">베이지</label>
                                </span>
                                <span class="checkbox noTxt red">
                                    <input type="radio" id="chk0206" name="chk02">
                                    <label for="chk0206">레드</label>
                                </span>
                                <span class="checkbox noTxt blue">
                                    <input type="radio" id="chk0207" name="chk02">
                                    <label for="chk0207">블루</label>
                                </span>
                                <span class="checkbox noTxt yellow">
                                    <input type="radio" id="chk0208" name="chk02">
                                    <label for="chk0208">옐로우</label>
                                </span>
                                <span class="checkbox noTxt green">
                                    <input type="radio" id="chk0209" name="chk02">
                                    <label for="chk0209">그린</label>
                                </span>
                                <span class="checkbox noTxt purple">
                                    <input type="radio" id="chk0210" name="chk02">
                                    <label for="chk0210">퍼플</label>
                                </span>
                            </div>
                            <!--// checkboxWrap -->
                        </div>
                        <dl>
                            <dt>배송비</dt>
                            <dd>
                                <select title="배송비">
                                    <option>[필수] 주문시 결제</option>
                                </select>
                            </dd>
                        </dl>
                        <dl>
                            <dt>추가옵션</dt>
                            <dd>
                                <select title="추가옵션">
                                    <option>[선택] 추가옵션</option>
                                </select>
                            </dd>
                        </dl>
                        <div class="totalArea">
                            <p><span>루멘 미디데스크</span> - 옐로우/화이트 /수도권 (서울,경기,인천) (+ ₩50 ,000)/없음</p>
                            <div>
                                <count/>
                            </div>
                        </div>
                        <div class="totalPrice">
                            <span class="fontG">TOTAL</span>
                            <em>₩ 1,400,000</em>
                        </div>
                        <div class="btnArea">
                            <button type="button" class="btn sL">구매하기</button>
                            <button type="button" class="btn bgWhite cartBtn"><span class="hide">장바구니</span></button>
                        </div>
                    </div>
                    <!--// floatMenu -->
                    
                    <div class="detail">
                        <div style="background:#F8F8F8; min-height:1000px;">
                            상세정보 영역
                        </div>
                    </div>
                    <div class="productInfo">
                        <h4>상품결제안내</h4>
                        <div>
                            상품결제안내 내용
                        </div>
                        <h4>배송안내</h4>
                        <div>
                            배송안내 내용
                        </div>
                        <h4>교환 & 반품안내</h4>
                        <div>
                            교환 & 반품안내 내용
                        </div>

                    </div>
                </div>
                <!-- fixArea -->
            </div>
            <!--// productDetail -->
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted, watchEffect } from 'vue';
    import count from '@/components/button/count.vue'

    // 이미지 목록을 정의합니다.
    const images = ref([
        { src: 'src/assets/images/img-product-4.png', alt: 'Image 1' },
        { src: 'src/assets/images/img-product.jpg', alt: 'Image 2' },
        { src: 'src/assets/images/img-product-4.png', alt: 'Image 3' },
        { src: 'src/assets/images/img-product.png', alt: 'Image 4' },
        { src: 'src/assets/images/img-product-5.png', alt: 'Image 5' }
    ]);

    // 활성화된 이미지의 src를 저장합니다.
    const activeImage = ref(images.value[0].src);

    // 이미지 클릭 시 활성화된 이미지를 설정합니다.
    const setActiveImage = (event, imgSrc) => {
    event.preventDefault();
    activeImage.value = imgSrc;
    
    // 모든 링크에서 active 클래스를 제거합니다.
    const links = document.querySelectorAll('.preList a');
    links.forEach(link => link.classList.remove('active'));

    // 클릭된 링크에 active 클래스를 추가합니다.
    event.currentTarget.classList.add('active');
    };

    onMounted(() => {
        if (window.innerWidth >= 768) {
            const floatMenu = document.querySelector('.floatMenu');
            const footer = document.querySelector('#footer');
            const initialTop = parseInt(window.getComputedStyle(floatMenu).top, 10);

            const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const footerRect = footer.getBoundingClientRect();
            const floatMenuHeight = floatMenu.offsetHeight;
            const floatMenuBottom = scrollY + floatMenu.getBoundingClientRect().top + floatMenuHeight;

            if (footerRect.top <= window.innerHeight) {
                floatMenu.classList.add('sticky');
            } else {
                floatMenu.classList.remove('sticky');
            }
            };

            window.addEventListener('scroll', handleScroll);

            watchEffect((onInvalidate) => {
            onInvalidate(() => {
                window.removeEventListener('scroll', handleScroll);
            });
            });
        }
        });
</script>