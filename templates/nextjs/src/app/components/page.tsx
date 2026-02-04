import Image from 'next/image'

import { ContentCard } from '@/components/content-card'

import styles from './page.module.css'

export default function ComponentsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Component Showcase</h1>
                <p>ContentCard component variants and examples</p>
            </header>

            <section className={styles.section}>
                <h2>Stacked Layout (with link)</h2>
                <p className={styles.description}>
                    The entire card is clickable via the title link. Hover to see the effects.
                </p>
                <div className={styles.grid}>
                    <ContentCard layout="stacked">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop"
                                alt="React code on screen"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/articles/react-server-components">
                                Understanding React Server Components
                            </ContentCard.Title>
                            <ContentCard.Description>
                                Learn how React Server Components can improve your
                                application&apos;s performance and user experience with modern web
                                development practices.
                            </ContentCard.Description>
                            <ContentCard.Footer>
                                <time dateTime="2024-01-15">January 15, 2024</time>
                                <span> • 5 min read</span>
                            </ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>

                    <ContentCard layout="stacked">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop"
                                alt="Code on laptop"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/articles/nextjs-tips">
                                10 Next.js Tips for Performance
                            </ContentCard.Title>
                            <ContentCard.Description>
                                Optimize your Next.js application with these practical tips and
                                best practices for better performance.
                            </ContentCard.Description>
                            <ContentCard.Footer>
                                <time dateTime="2024-02-20">February 20, 2024</time>
                                <span> • 8 min read</span>
                            </ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>

                    <ContentCard layout="stacked">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=450&fit=crop"
                                alt="Programming workspace"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/articles/typescript-basics">
                                Getting Started with TypeScript
                            </ContentCard.Title>
                            <ContentCard.Description>
                                A comprehensive guide to TypeScript basics and how to integrate it
                                into your projects.
                            </ContentCard.Description>
                            <ContentCard.Footer>
                                <time dateTime="2024-03-10">March 10, 2024</time>
                                <span> • 6 min read</span>
                            </ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Horizontal Layout (with link)</h2>
                <p className={styles.description}>
                    Perfect for list views or sidebars. Image is displayed on the right side.
                </p>
                <div className={styles.stack}>
                    <ContentCard layout="horizontal">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=300&fit=crop"
                                alt="CSS Grid tutorial"
                                fill
                                sizes="12rem"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/blog/css-grid">
                                Master CSS Grid Layout
                            </ContentCard.Title>
                            <ContentCard.Description>
                                Learn CSS Grid with practical examples and real-world use cases.
                            </ContentCard.Description>
                            <ContentCard.Footer>April 5, 2024</ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>

                    <ContentCard layout="horizontal">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
                                alt="Accessibility guide"
                                fill
                                sizes="12rem"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/blog/web-accessibility">
                                Web Accessibility Best Practices
                            </ContentCard.Title>
                            <ContentCard.Description>
                                Build inclusive web applications that everyone can use.
                            </ContentCard.Description>
                            <ContentCard.Footer>May 12, 2024</ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>

                    <ContentCard layout="horizontal">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
                                alt="Design systems"
                                fill
                                sizes="12rem"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/blog/design-systems">
                                Building a Design System
                            </ContentCard.Title>
                            <ContentCard.Description>
                                Create consistent and scalable design systems for your team.
                            </ContentCard.Description>
                            <ContentCard.Footer>June 8, 2024</ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>
                </div>
            </section>

            <section className={styles.section}>
                <h2>With CTA Button (no nested links!)</h2>
                <p className={styles.description}>
                    Cards can have both a main link (stretched over the card) and separate CTA
                    links/buttons. The CTA sits above the stretched link using z-index, avoiding
                    nested link issues.
                </p>
                <div className={styles.grid}>
                    <ContentCard layout="stacked">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
                                alt="Course thumbnail"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/courses/react-fundamentals">
                                React Fundamentals Course
                            </ContentCard.Title>
                            <ContentCard.Description>
                                Master the basics of React with this comprehensive course. Perfect
                                for beginners.
                            </ContentCard.Description>
                            <ContentCard.Cta>
                                <a href="/enroll/react-fundamentals" className={styles['cta-button']}>
                                    Enroll Now
                                </a>
                            </ContentCard.Cta>
                            <ContentCard.Footer>
                                <span>12 hours • Beginner</span>
                            </ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>

                    <ContentCard layout="stacked">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
                                alt="Workshop thumbnail"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/workshops/advanced-typescript">
                                Advanced TypeScript Workshop
                            </ContentCard.Title>
                            <ContentCard.Description>
                                Deep dive into TypeScript&apos;s advanced features and patterns.
                            </ContentCard.Description>
                            <ContentCard.Cta>
                                <a href="/register/typescript" className={styles['cta-button']}>
                                    Register
                                </a>
                            </ContentCard.Cta>
                            <ContentCard.Footer>
                                <span>8 hours • Advanced</span>
                            </ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>

                    <ContentCard layout="stacked">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop"
                                alt="Tutorial thumbnail"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/tutorials/nextjs-deployment">
                                Next.js Deployment Guide
                            </ContentCard.Title>
                            <ContentCard.Description>
                                Learn how to deploy your Next.js applications to production.
                            </ContentCard.Description>
                            <ContentCard.Cta>
                                <a href="/start/deployment" className={styles['cta-button']}>
                                    Start Tutorial
                                </a>
                            </ContentCard.Cta>
                            <ContentCard.Footer>
                                <span>2 hours • Intermediate</span>
                            </ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Without Link (non-clickable)</h2>
                <p className={styles.description}>
                    Cards without a title link are not clickable.
                </p>
                <div className={styles.grid}>
                    <ContentCard layout="stacked">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop"
                                alt="Team collaboration"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title>Information Card</ContentCard.Title>
                            <ContentCard.Description>
                                This card is not clickable and can be used for display purposes
                                only. Perfect for showcasing information.
                            </ContentCard.Description>
                            <ContentCard.Footer>Static content</ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>

                    <ContentCard layout="stacked">
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
                                alt="Data visualization"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title>Display Only Card</ContentCard.Title>
                            <ContentCard.Description>
                                Use this variant when you need to display content without
                                navigation functionality.
                            </ContentCard.Description>
                            <ContentCard.Footer>No interaction</ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Custom Styling</h2>
                <p className={styles.description}>
                    All sub-components accept className prop for custom styling.
                </p>
                <div className={styles.grid}>
                    <ContentCard layout="stacked" className={styles['custom-card']}>
                        <ContentCard.Image>
                            <Image
                                src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&h=450&fit=crop"
                                alt="Custom styled card"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </ContentCard.Image>
                        <ContentCard.Body>
                            <ContentCard.Title href="/custom" className={styles['custom-title']}>
                                Custom Styled Card
                            </ContentCard.Title>
                            <ContentCard.Description>
                                This card demonstrates custom styling using className prop.
                            </ContentCard.Description>
                            <ContentCard.Footer>Customizable</ContentCard.Footer>
                        </ContentCard.Body>
                    </ContentCard>
                </div>
            </section>
        </div>
    )
}
