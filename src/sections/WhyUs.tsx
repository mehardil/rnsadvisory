import {
  Compass,
  FileCheck2,
  Globe2,
  Handshake,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import ArtFrame from '@/components/ArtFrame'
import IsoBadge, { toneFor } from '@/components/IsoBadge'

const reasons = [
  {
    icon: Compass,
    image: 'why-accountable',
    title: 'One accountable lead',
    text: 'A single senior person owns your file, coordinates specialists and answers when something changes. No ticket numbers.',
  },
  {
    icon: Handshake,
    image: 'why-aligned',
    title: 'Aligned incentives',
    text: 'Fixed fees where possible, disclosed commissions where they exist. We do not take university or vendor kickbacks.',
  },
  {
    icon: Globe2,
    image: 'why-local',
    title: 'Local depth, global standard',
    text: 'Teams live in the markets they advise on, tested against one client charter and one quality bar across eight regions.',
  },
  {
    icon: ShieldCheck,
    image: 'why-compliance',
    title: 'Compliance first',
    text: 'We would rather lose a mandate than file something that puts your residency, licence or reputation at risk.',
  },
  {
    icon: Zap,
    image: 'why-speed',
    title: 'Speed without shortcuts',
    text: 'Experienced teams remove the waiting, not the checks. Most enquiries receive a named response within four hours.',
  },
  {
    icon: FileCheck2,
    image: 'why-documented',
    title: 'Documented, always',
    text: 'Scopes, timelines, quotes and submissions are in writing. You leave with a file you can hand to any adviser.',
  },
]

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-ivory md:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-royal/20 blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Why RNS Global"
          title={
            <>
              The difference is <em className="text-softgold">how we work.</em>
            </>
          }
          description="Every firm claims expertise. Clients stay with us because the process is clear, the incentives are honest and someone answers."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            return (
              <Reveal key={reason.title} delay={index * 0.05}>
                <div className="group h-full overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/[0.03] transition-colors hover:border-gold/35 hover:bg-ivory/[0.05]">
                  <div className="relative h-24">
                    <ArtFrame
                      seed={reason.image}
                      imageKey={reason.image}
                      alt=""
                      animate={false}
                      rounded="rounded-none"
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute -bottom-4 left-5 z-10">
                      <IsoBadge icon={reason.icon} tone={toneFor(reason.title)} size="sm" />
                    </span>
                  </div>
                  <div className="p-5 pt-7 md:p-6 md:pt-8">
                    <h3 className="font-display text-[1.2rem] text-ivory">{reason.title}</h3>
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-ivory/55">{reason.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.15} className="mt-12 grid gap-6 rounded-2xl border border-ivory/10 bg-ivory/[0.03] p-6 md:grid-cols-12 md:p-8">
          <div className="md:col-span-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-softgold">A client charter</p>
            <p className="mt-3 font-display text-2xl leading-snug text-ivory">
              “Tell us the truth about our options, even when it is not what we want to hear.”
            </p>
          </div>
          <div className="md:col-span-8 md:pl-8">
            <p className="text-[0.85rem] leading-relaxed text-ivory/55">
              That request, from our first corporate client in 2013, became our client charter. It is printed in every
              office and included in every engagement letter. It means we will tell you when a visa is unlikely, when a
              market is wrong for you, and when a cheaper option would serve you better — even if it earns us less.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-ivory/10 pt-5">
              <div>
                <p className="font-mono text-lg text-softgold">96%</p>
                <p className="text-[0.66rem] text-ivory/40">Visa success</p>
              </div>
              <div>
                <p className="font-mono text-lg text-softgold">68%</p>
                <p className="text-[0.66rem] text-ivory/40">Client referrals</p>
              </div>
              <div>
                <p className="font-mono text-lg text-softgold">15 yrs</p>
                <p className="text-[0.66rem] text-ivory/40">In practice</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
