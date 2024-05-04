function attachDummyDataForAllNewUser(userId, categoryId) {
  let data = [
    {
      title: "Mac comp ",
      description: "very good comp",
      price: 5000,
      category: categoryId,
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714768949/product_images/tmp-4-1714768947634_gtgp3x.jpg",
      owner: userId,
      public_id: "product_images/tmp-4-1714768947634_gtgp3x",
      __v: 0,
    },
    {
      title: "Apples",
      description: "A red high quality apples",
      price: 600,
      category: categoryId,
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714769199/product_images/tmp-3-1714769197249_o2xnh1.jpg",
      owner: userId,
      public_id: "product_images/tmp-3-1714769197249_o2xnh1",
      __v: 0,
    },
    {
      title: "Green Apples",
      description: "A Green high quality apples",
      price: 900,
      category: categoryId,
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714769259/product_images/tmp-4-1714769257429_fwhamc.jpg",
      owner: userId,
      public_id: "product_images/tmp-4-1714769257429_fwhamc",
      __v: 0,
    },
    {
      title: "Green Apples",
      description: "A Green high quality apples",
      price: 900,
      category: categoryId,
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714769259/product_images/tmp-4-1714769257429_fwhamc.jpg",
      owner: userId,
      public_id: "product_images/tmp-4-1714769257429_fwhamc",
      __v: 0,
    },
    {
      title: "Red Car",
      description: "Super car",
      price: 155,
      category: categoryId,
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714769717/product_images/tmp-12-1714769716412_aszfk1.webp",
      owner: userId,
      public_id: "product_images/tmp-12-1714769716412_aszfk1",
      __v: 0,
    },

    {
      title: "Black Cycle",
      description: "Fancy looking cycle",
      price: 125991,
      category: categoryId,
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714769642/product_images/tmp-10-1714769641087_wqdqla.jpg",
      owner: userId,
      public_id: "product_images/tmp-10-1714769641087_wqdqla",
      __v: 0,
    },
    {
      title: "Man Running",
      description: "A man is running on the treadmeal",
      price: 191,
      category: categoryId,
      image:
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1714777226/category_images/tmp-1-1714777217176_c6606k.jpg",
      owner: userId,
      public_id: "product_images/tmp-10-1714769641087_wqdqla",
      __v: 0,
    },
  ];
  categoryId.forEach((el, i) => {
    data[i].category = el;
  });

  return data;
}
function createDummyCategory(ownerId) {
  let data = [
    {
      name: "Mac Book pro 1",
      slug: "Electronics",
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714772033/category_images/tmp-2-1714772032125_tbvy0w.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-1-1714767199923_ldky6k",
      createdAt: "2024-05-03T20:13:22.561Z",
      updatedAt: "2024-05-03T21:34:54.899Z",
      __v: 0,
    },
    {
      name: "Fitness",
      slug: "Exercise",
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714768934/category_images/tmp-3-1714768932790_fjvcqx.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-3-1714768932790_fjvcqx",
      createdAt: "2024-05-03T20:42:15.695Z",
      updatedAt: "2024-05-03T20:42:15.695Z",
      __v: 0,
    },
    {
      name: "Papaya",
      slug: "Fruits",
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714769111/category_images/tmp-1-1714769109207_vfpwh2.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-1-1714769109207_vfpwh2",
      createdAt: "2024-05-03T20:45:11.780Z",
      updatedAt: "2024-05-03T20:45:11.780Z",
      __v: 0,
    },
    {
      name: "Apples",
      slug: "Fruits",
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714769151/category_images/tmp-2-1714769149581_bfk63p.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-2-1714769149581_bfk63p",
      createdAt: "2024-05-03T20:45:52.443Z",
      updatedAt: "2024-05-03T20:45:52.443Z",
      __v: 0,
    },
    {
      name: "Cars",
      slug: "car",
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714769443/category_images/tmp-5-1714769442332_fsh5ao.webp",
      owner: ownerId,
      public_id: "category_images/tmp-5-1714769442332_fsh5ao",
      createdAt: "2024-05-03T20:50:43.851Z",
      updatedAt: "2024-05-03T20:50:43.851Z",
      __v: 0,
    },
    {
      name: "Cycle",
      slug: "Paddle",
      image:
        "http://res.cloudinary.com/de4jpzltu/image/upload/v1714772268/category_images/tmp-1-1714772267465_x76iii.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-1-1714772267465_x76iii",
      createdAt: "2024-05-03T21:37:48.977Z",
      updatedAt: "2024-05-03T21:37:48.977Z",
      __v: 0,
    },
    {
      name: "Gym",
      slug: "gym",
      image:
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1714776469/category_images/tmp-8-1714776468090_zkwm5k.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-1-1714772267465_x76iii",
      createdAt: "2024-05-03T21:37:48.977Z",
      updatedAt: "2024-05-03T21:37:48.977Z",
      __v: 0,
    },
  ];
  return data;
}
module.exports = { createDummyCategory, attachDummyDataForAllNewUser };
