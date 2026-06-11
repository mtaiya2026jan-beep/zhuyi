'use client'

import { useState } from 'react'

const cards = [
  {
    id: 'ami',
    emoji: '🏠',
    title: '我想申请福利房',
    desc: '查询家庭收入是否符合Section 8或Housing Connect申请条件',
    tags: ['AMI资格测算', '楼盘匹配', '材料清单'],
    color: '#CC2B2B',
    bg: '#FFF0F0',
    href: '/ami',
    cta: '免费测算资格 →',
  },
  {
    id: 'voucher',
    emoji: '🎫',
    title: '我手里有券，正在找房',
    desc: '查看剩余天数，登记后优先匹配愿意接受Section 8的华人房东',
    tags: ['120天倒计时', '优先级排序', '华人房东匹配'],
    color: '#E07B00',
    bg: '#FAEEDA',
    href: '/voucher',
    cta: '登记找房 →',
    badge: '法院判决后更难找房，立即行动',
  },
  {
    id: 'renewal',
    emoji: '📋',
    title: '我已入住，需要年审',
    desc: '年审截止日期提醒，错过就可能失去住房资格',
    tags: ['截止日期提醒', '材料核查', '中文辅助'],
    color: '#185FA5',
    bg: '#E6F1FB',
    href: '/renewal',
    cta: '设置年审提醒 →',
    comingSoon: true,
  },
  {
    id: 'landlord',
    emoji: '🏢',
    title: '我是房东，愿意接受Section 8',
    desc: '登记房源，我们帮你匹配合规华人租客，减少空置期',
    tags: ['房客匹配', '政府稳定租金', '免费登记'],
    color: '#0F6E56',
    bg: '#E1F5EE',
    href: '/landlord',
    cta: '登记房源 →',
    comingSoon: true,
  },
]

export default function HomePage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <main style={{
      minHeight: '100vh',
      background: '#F7F6F3',
      fontFamily: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    }}>
      {/* 顶部导航 */}
      <div style={{
        background: '#CC2B2B',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>住易 ZhuYi</div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>纽约华人住房福利平台</div>
      </div>

      <div style={{ maxWidth: '540px', margin: '0 auto', padding: '28px 16px' }}>

        {/* 头部介绍 */}
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px' }}>
            你需要哪方面的帮助？
          </h1>
          <p style={{ fontSize: '14px', color: '#666', margin: '0', lineHeight: '1.6' }}>
            选择你的情况，我们提供中文全程辅助
          </p>
        </div>

        {/* 卡片网格 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => { if (!card.comingSoon) window.location.href = card.href }}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '18px 16px',
                border: hoveredId === card.id && !card.comingSoon
                  ? `2px solid ${card.color}`
                  : '1.5px solid #EBEBEB',
                cursor: card.comingSoon ? 'default' : 'pointer',
                transition: 'all 0.15s',
                position: 'relative',
                opacity: card.comingSoon ? 0.75 : 1,
                boxShadow: hoveredId === card.id && !card.comingSoon
                  ? `0 4px 16px ${card.color}20`
                  : '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {/* 即将上线标签 */}
              {card.comingSoon && (
                <div style={{
                  position: 'absolute', top: '10px', right: '10px',
                  background: '#F0F0F0', color: '#999',
                  fontSize: '10px', fontWeight: '500',
                  padding: '2px 7px', borderRadius: '10px',
                }}>
                  即将上线
                </div>
              )}

              {/* 紧急提示 */}
              {card.badge && (
                <div style={{
                  background: '#FFF0F0',
                  color: '#CC2B2B',
                  fontSize: '10px',
                  fontWeight: '500',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  marginBottom: '10px',
                  lineHeight: '1.4',
                }}>
                  ⚠️ {card.badge}
                </div>
              )}

              {/* Emoji图标 */}
              <div style={{
                width: '40px', height: '40px',
                background: card.bg,
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '12px',
              }}>
                {card.emoji}
              </div>

              {/* 标题 */}
              <p style={{
                fontSize: '14px', fontWeight: '600',
                color: '#1a1a1a', margin: '0 0 6px',
                lineHeight: '1.4',
              }}>
                {card.title}
              </p>

              {/* 描述 */}
              <p style={{
                fontSize: '12px', color: '#666',
                margin: '0 0 12px', lineHeight: '1.5',
              }}>
                {card.desc}
              </p>

              {/* 功能标签 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                {card.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '10px', padding: '2px 7px',
                    background: card.bg, color: card.color,
                    borderRadius: '6px', fontWeight: '500',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA按钮 */}
              {!card.comingSoon && (
                <div style={{
                  fontSize: '13px', fontWeight: '600',
                  color: card.color,
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  {card.cta}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 底部信任背书 */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize: '24px' }}>🔒</div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '500', color: '#333', margin: '0 0 2px' }}>
              你的信息安全
            </p>
            <p style={{ fontSize: '12px', color: '#999', margin: '0', lineHeight: '1.5' }}>
              数据加密存储 · 不出售个人信息 · 仅用于住房匹配
            </p>
          </div>
        </div>

        {/* 底部说明 */}
        <p style={{
          fontSize: '11px', color: '#bbb',
          textAlign: 'center', margin: '20px 0 0',
          lineHeight: '1.6',
        }}>
          住易 ZhuYi · 纽约华人住房福利平台<br />
          数据来源：HUD 2025年 · NYCHA官方 · 纽约市住房局
        </p>
      </div>
    </main>
  )
}
