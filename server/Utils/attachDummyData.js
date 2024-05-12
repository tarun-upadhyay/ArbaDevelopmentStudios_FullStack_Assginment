function attachDummyDataForAllNewUser(userId, categoryId) {
  let data = [
    {
      title: "Mac comp ",
      description: "very good comp",
      price: 5000,
      category: categoryId,
      image:
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1714772033/category_images/tmp-2-1714772032125_tbvy0w.jpg",
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
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1713649559/category_images/tmp-3-1713649557924_xjvcds.jpg",
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
      title: "Cars",
      description: "A high speed car",
      price: 900,
      category: categoryId,
      image:
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1714778165/category_images/tmp-5-1714778164668_fbt9k9.webp",
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
      title: "EV",
      description: "EV",
      price: 125991,
      category: categoryId,
      image:
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1713620953/category_images/tmp-1-1713620950413_wdpzzv.jpg",
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
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1713644106/category_images/tmp-34-1713644103484_gd7q1p.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-3-1714768932790_fjvcqx",
      createdAt: "2024-05-03T20:42:15.695Z",
      updatedAt: "2024-05-03T20:42:15.695Z",
      __v: 0,
    },
    {
      name: "Vehicle",
      slug: "Vehicle",
      image:
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1714778165/category_images/tmp-5-1714778164668_fbt9k9.webp",
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
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1713649559/category_images/tmp-3-1713649557924_xjvcds.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-2-1714769149581_bfk63p",
      createdAt: "2024-05-03T20:45:52.443Z",
      updatedAt: "2024-05-03T20:45:52.443Z",
      __v: 0,
    },
    {
      name: "Diet",
      slug: "Diet",
      image:
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1714778177/category_images/tmp-6-1714778176035_yzahmm.jpg",
      owner: ownerId,
      public_id: "category_images/tmp-5-1714769442332_fsh5ao",
      createdAt: "2024-05-03T20:50:43.851Z",
      updatedAt: "2024-05-03T20:50:43.851Z",
      __v: 0,
    },
    {
      name: "EV",
      slug: "EV",
      image:
        "https://res.cloudinary.com/de4jpzltu/image/upload/v1713620953/category_images/tmp-1-1713620950413_wdpzzv.jpg",
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
