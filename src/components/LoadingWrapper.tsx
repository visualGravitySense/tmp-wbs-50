/** Renders children immediately. A previous 2s artificial delay destroyed LCP/TBT. */
export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
