# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Rewards"
      id: "goalset"
      location: "example#goalset" # Supersonic module#view type navigation
    }
    {
      title: "Workouts"
      id: "workouts"
      location: "example#workouts"
    }
    {
      title: "Progress"
      id: "progress"
      location: "example#progress" # URLs are supported!
    }
  ]

  # rootView:
  #   location: "example#getting-started"

  preloads: [
    {
      id: "popup"
      location: "example#popup"
    }
    {
      id: "using-the-scanner"
      location: "example#using-the-scanner"
    }
  ]

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  initialView:
    id: "initialView"
    location: "example#initial-view"
