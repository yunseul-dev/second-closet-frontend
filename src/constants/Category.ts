type CategoryType = {
  [category: string]: {
    [subcategory: string]: string[];
  };
};

const Category: CategoryType = {
  여성의류: {
    아우터: ['패딩', '점퍼', '코트', '자켓', '가디건', '조끼/베스트'],
    상의: ['맨투맨', '긴소매티셔츠', '후디', '셔츠', '블라우스', '반소매티셔츠', '슬리브리스'],
    니트웨어: ['가디건', '크루넥', '브이넥', '베스트', '터틀넥', '캐시미어'],
    바지: ['데님', '트레이닝', '슬랙스', '와이드', '쇼트', '코튼', '스트레이트', '슬림', '레깅스'],
    원피스: ['롱원피스', '미니원피스', '미디원피스', '데님원피스'],
    스커트: ['롱', '미니', '미디', '데님'],
    홈웨어: ['세트', '원피스', '하의', '로브', '상의'],
  },
  남성의류: {
    아우터: ['패딩', '점퍼', '코트', '자켓', '가디건', '조끼/베스트'],
    상의: ['맨투맨', '긴소매티셔츠', '후디', '셔츠', '블라우스', '반소매티셔츠', '슬리브리스'],
    니트웨어: ['가디건', '크루넥', '브이넥', '베스트', '터틀넥', '캐시미어'],
    바지: ['데님', '트레이닝', '슬랙스', '와이드', '쇼트', '코튼', '스트레이트', '슬림', '레깅스'],
    홈웨어: ['세트', '원피스', '하의', '로브', '상의'],
  },
  가방: {
    숄더백: [] as never[],
    크로스백: [] as never[],
    백팩: [] as never[],
    토트백: [] as never[],
    '에코백/캔버스백': ['에코백', '캔버스'],
    클러치: ['파우치', '클러치'],
  },
  신발: {
    부츠: ['앵클', '미드힐', '미들', '롱', '하이힐', '레인부츠'],
    '플랫/로퍼': ['로퍼', '플랫'],
    스니커즈: ['슬립온', '런닝화', '뮬스니커즈', '기능성운동화'],
    '슬리퍼/뮬': ['뮬', '슬리퍼', '플립플랍'],
    샌들: ['미드힐', '플랫', '하이힐'],
  },
  액세서리: {
    주얼리: ['목걸이', '반지', '팔찌', '브로치/펜던트', '발찌'],
    헤어: ['헤어핀', '머리띠/밴드', '머리끈', '귀마개'],
    아이웨어: ['안경', '선글라스'],
    시계: ['가죽시계', '메탈시계', '전자/스포츠시계', '패브릭 시계'],
    벨트: [] as never[],
    장갑: [] as never[],
    머플러: [] as never[],
  },
};

export { Category };
