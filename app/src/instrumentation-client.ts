import posthog from "posthog-js";

if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    capture_pageview: false, // manual — onRouterTransitionStart only fires on later
    // navigations, not the first load, so the initial page still needs its own
    // explicit capture below or it never gets counted.
    person_profiles: "identified_only",
  });
  posthog.capture("$pageview");
}

export function onRouterTransitionStart(url: string) {
  posthog.capture("$pageview", { $current_url: url });
}
