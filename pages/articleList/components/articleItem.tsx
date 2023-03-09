import { Article } from '../../../generated';
import { Row, RowProps, Typography, Col } from 'antd';
import { FC } from 'react';
import styles from './articleItem.module.less';
import '../../../libs/animate/fadeInRight.less';
import { getImageUrl } from '../../../utils/imgUtils';

interface IArticleItemProps extends RowProps {
  data: Partial<Article>;
}

const ArticleItem: FC<IArticleItemProps> = ({ data, ...props }) => {
  const goToDetail = () => {
    window.location.href = `/app/article/${data.id}`;
  }

  const backgroundImage = getImageUrl('cool-background.png', { width: 1024, height: 512 });

  return (
    <Row 
      justify="center"
      className={styles.articleItem}
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    > 
      <Row justify="center">
        <Typography.Title level={2} onClick={() => goToDetail()} className={styles.linkText}>
          { data.title }
        </Typography.Title>
      </Row>
      <Row justify="center" >
        <Typography.Title level={4} onClick={() => goToDetail()} className={styles.linkText}>
          { data.description }
        </Typography.Title>
      </Row>
      <Row justify="end" className={styles.tagZone}>
        <Col>
          <span>   
            {
              data?.tagList?.map((tag, index) => {
                return (
                  <span 
                    className={styles.tag} 
                    key={data.id + index}
                    style={{ backgroundColor: tag.color }}
                  >
                    <span className={styles.tagName}>{ tag.name }</span>
                  </span>
                )
              })

            }
          </span>
        </Col>
      </Row>
    </Row>
  )
}

export default ArticleItem;