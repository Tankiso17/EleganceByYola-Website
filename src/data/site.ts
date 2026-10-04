import heroImage from "../assets/Images/MakeUp/Formal_Events/image 4.jpeg"
import naturalMakeupImage from "../assets/Images/MakeUp/Formal_Events/image 1.jpeg"
import softGlamImage from "../assets/Images/MakeUp/Formal_Events/image 2.jpeg"
import fullMakeupImage from "../assets/Images/MakeUp/Spring_Promo/image 1.jpeg"
import bridalImage from "../assets/Images/MakeUp/House_Call/image 1.jpeg"
import graduationImage from "../assets/Images/MakeUp/Graduation_Bookings/image 1.jpeg"
import locStyleImage from "../assets/Images/DreadLocks/Dreadlocks_Styles/image 1.jpeg"
import braidStyleImage from "../assets/Images/DreadLocks/Dreadlocks_Styles/image 2.jpeg"
import locDetailImage from "../assets/Images/DreadLocks/Dreadlocks_Styles/image 3.jpeg"
import locDesignImage from "../assets/Images/DreadLocks/Dreadlocks_Styles/image 4.jpeg"
import locExtensionImage from "../assets/Images/DreadLocks/Dreadlocks_Extensions/image 2.jpeg"
import locCurlImage from "../assets/Images/DreadLocks/Dreadlocks_Extensions/image 4.jpeg"
import locPortraitImage from "../assets/Images/DreadLocks/Dreadlocks_Extensions/image 5.jpeg"
import priceListImage from "../assets/Images/Price_List/pricelist.jpeg"
import fullGlamVideo from "../assets/VIdeos/Full_Glam/video 1.mp4"
import softGlamVideo from "../assets/VIdeos/Soft_Glam/video 1.mp4"
import extensionsVideo from "../assets/VIdeos/Extenstions/video 1.mp4"
import bridalVideo from "../assets/VIdeos/Bridal/video 1.mp4"
import retwistsVideo from "../assets/VIdeos/Retwists/video 1.mp4"
import locStylesVideo from "../assets/VIdeos/Loc_Styles/video 1.mp4"
import fullGlamThumbnail from "../assets/VIdeos/Full_Glam/thumbnail.png"
import softGlamThumbnail from "../assets/VIdeos/Soft_Glam/thumbnail.jpeg"
import retwistsThumbnail from "../assets/VIdeos/Retwists/thumbnail.png"
import bridalThumbnail from "../assets/VIdeos/Bridal/image 1.jpeg"

export type PricingTier = "standard" | "student"

export type Service = {
  id: number

  category: "Dreadlocks" | "Makeup"

  name: string

  description: string

  image: string

  price?: number

  studentPrice?: number
}

export const photos = {
  hero: heroImage,
  locs: locStyleImage,
  braids: braidStyleImage,
  makeup: naturalMakeupImage,
  glam: fullMakeupImage,
  editorial: locDesignImage,
  red: locPortraitImage,
  gold: bridalImage,
  soft: softGlamImage,
  graduation: graduationImage,
  locDetail: locDetailImage,
  locExtension: locExtensionImage,
  locCurls: locCurlImage,
  priceList: priceListImage,
}

export const services: Service[] = [
  {
    id: 1,
    category: "Makeup",
    name: "Natural Look",
    description:
      "A light, personalised look that enhances your natural features.",
    image: photos.makeup,
    price: 250,
    studentPrice: 200,
  },
  {
    id: 2,
    category: "Makeup",
    name: "Soft Glam",
    description:
      "Softly defined makeup for everyday confidence and special occasions.",
    image: photos.soft,
    price: 350,
    studentPrice: 260,
  },
  {
    id: 3,
    category: "Makeup",
    name: "Full Makeup Beat",
    description: "A polished makeup look tailored to your style and occasion.",
    image: photos.glam,
    price: 450,
    studentPrice: 300,
  },
  {
    id: 4,
    category: "Makeup",
    name: "Bridal Makeup",
    description: "Personalised bridal makeup for your wedding day.",
    image: photos.gold,
  },
  {
    id: 5,
    category: "Dreadlocks",
    name: "Dreadlock Styling",
    description:
      "A personalised style shaped around your locs and the look you want.",
    image: photos.locs,
    price: 250,
  },
  {
    id: 6,
    category: "Dreadlocks",
    name: "Dreadlock Extensions",
    description: "Extensions styled to complement your locs and personal look.",
    image: photos.locExtension,
    price: 290,
  },
  {
    id: 7,
    category: "Dreadlocks",
    name: "Curls on Dreadlocks",
    description:
      "Add curls to your dreadlocks for a defined, occasion-ready style.",
    image: photos.locCurls,
  },
  {
    id: 8,
    category: "Dreadlocks",
    name: "Braiding on Dreadlocks",
    description: "Braided styling worked into your dreadlocks.",
    image: photos.braids,
  },
  {
    id: 9,
    category: "Dreadlocks",
    name: "Dreadlock Wash",
    description: "A wash service to refresh and care for your dreadlocks.",
    image: photos.locDetail,
    price: 80,
  },
  {
    id: 10,
    category: "Dreadlocks",
    name: "Creative Loc Designs",
    description:
      "Creative dreadlock styling designed around your individual style.",
    image: photos.editorial,
  },
  {
    id: 11,
    category: "Dreadlocks",
    name: "Dreadlock Twist",
    description: "A neat retwist for fresh roots and tidy locs.",
    image: photos.locDetail,
    price: 200,
  },
]

export const highlightCategories = [
  "Soft glam",
  "Full glam",
  "Retwists",
  "Loc styles",
  "Loc extensions",
  "Natural Look",
]

export const highlightImages = [
  softGlamThumbnail,
  fullGlamThumbnail,
  retwistsThumbnail,
  photos.locs,
  photos.locExtension,
  bridalThumbnail,
]

export const highlightVideos = [
  softGlamVideo,
  fullGlamVideo,
  retwistsVideo,
  locStylesVideo,
  extensionsVideo,
  bridalVideo,
]

const portfolioImages = import.meta.glob<string>(
  "../assets/Images/**/*.{jpeg,jpg,png,webp,avif}",
  { eager: true, query: "?url", import: "default" },
)

const formatCollectionName = (name: string) =>
  name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())

const collectionLabels: Record<string, string> = {
  Before_and_After: "Beauty Transformations",
  Formal_Events: "Event Makeup",
  Graduation_Bookings: "Graduation Glam",
  House_Call: "House-Call Beauty",
  Spring_Promo: "Soft Glam",
  Traditional_Promo: "Traditional Glam",
  Dreadlocks_Extensions: "Loc Extensions",
  Dreadlocks_Styles: "Loc Styling",
}

const portfolioCollectionOrder = [
  "Spring_Promo",
  "Traditional_Promo",
  "Graduation_Bookings",
  "Formal_Events",
  "House_Call",
  "Before_and_After",
  "Dreadlocks_Extensions",
  "Dreadlocks_Styles",
]

const serviceImageUrls = new Set(services.map((service) => service.image))

export const portfolioItems = Object.entries(portfolioImages)
  .filter(
    ([path, image]) =>
      ["MakeUp", "DreadLocks"].includes(path.split("/")[3]) &&
      !serviceImageUrls.has(image),
  )
  .sort(([firstPath], [secondPath]) =>
    portfolioCollectionOrder.indexOf(firstPath.split("/")[4]) -
      portfolioCollectionOrder.indexOf(secondPath.split("/")[4]) ||
      firstPath.localeCompare(secondPath, undefined, { numeric: true }),
  )
  .map(([path, image]): [string, string, string, string] => {
    const pathParts = path.split("/")
    const category = pathParts[3] === "MakeUp" ? "Makeup" : "Dreadlocks"
    const collectionFolder = pathParts[4] ?? "Portfolio"
    const collection =
      collectionLabels[collectionFolder] ??
      formatCollectionName(collectionFolder)
    const description =
      category === "Makeup"
        ? `${collection} makeup portfolio image`
        : `${collection} dreadlock portfolio image`

    return [image, description, collection, category]
  })

export const bookingSteps = [
  [
    "01",
    "Choose services",
    "Select the beauty services that feel right for you.",
  ],

  [
    "02",
    "Send your request",
    "Share your date, location and any special details.",
  ],

  [
    "03",
    "Get confirmation",
    "We'll follow up personally to confirm the service and appointment details.",
  ],
] as const

export const navigationLinks = [
  ["Services", "#services"],
  ["My Work", "#work"],
  ["Videos", "#videos"],
  ["Book", "#book"],
] as const
